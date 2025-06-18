import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { SubmitHandler } from "react-hook-form";
import type { LoginRequest } from "../redux/api/authAPI";
import { useLoginMutation } from "../redux/api/authAPI";
import { useDispatch } from "react-redux";
import { setCreddentials } from "../redux/auth/slice";

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const validationSchema = yup
    .object({
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
  } = useForm<LoginRequest>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const user = await login(data).unwrap();
      dispatch(setCreddentials(user));
      navigate("/");
    } catch (error) {
      toast.dismiss();
      toast.error("Credentials are incorrect");
    }
  };

  const navigate = useNavigate();

  return (
    <main className="sign-in-page">
      <ToastContainer />
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form" autoComplete="off">
        <h2 className="sign-in-form__title">Sign In</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input {...register("email")} type="email" />
          <p>{errors.email?.message}</p>
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input {...register("password")} autoComplete="new-password"/>
          <p>{errors.password?.message}</p>
        </label>
        <button className="button" type="submit" disabled={isLoading}>
          Sign In
        </button>
      </form>
      <span>
       Don't have an account?
        <Link to="/sign-up" className="sign-in-form__link">
          Sign Up
        </Link>
      </span>
    </main>
  );
};

export default SignIn;
