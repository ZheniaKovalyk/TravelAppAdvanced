import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../redux/api/authAPI";
import { useSignUpMutation } from "../redux/api/authAPI";
import { setCreddentials } from "../redux/auth/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [signUp, { isLoading }] = useSignUpMutation();

  const dispatch = useDispatch();

  const validationSchema = yup
    .object({
      fullName: yup.string().required("Please, enter a full name"),
      email: yup.string().email("Enter valid email").required("Please, enter email"),
      password: yup
        .string()
        .min(3, "Passowrd must be at least 3 characters")
        .max(20, "Passowrd must be at least 20 characters")
        .required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      const user = await signUp(data).unwrap();
      dispatch(setCreddentials(user));
      navigate("/");
    } catch (error) {
      toast.dismiss();
      toast.error("Email already registered");
    }
  };

  const navigate = useNavigate();

  return (
    <main className="sign-up-page">
      <ToastContainer />
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form" autoComplete="off">
        <h2 className="sign-up-form__title">Sign Up</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Full name</span>
          <input {...register("fullName")} />
          <p>{errors.fullName?.message}</p>
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input {...register("email")} type="email" />
          <p>{errors.email?.message}</p>
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input {...register("password")} autoComplete="new-password" />
          <p>{errors.password?.message}</p>
        </label>
        <button className="button" type="submit" disabled={isLoading}>
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?
        <Link to="/sign-in" className="sign-up-form__link">
          Sign In
        </Link>
      </span>
    </main>
  );
};

export default SignUp;
