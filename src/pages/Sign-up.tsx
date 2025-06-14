import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name === "full-name" ? "fullName" : name;
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const validate = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3 || formData.password.length > 20) {
      newErrors.password = "Password must be 3–20 characters";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      navigate("/");
    }
  };

  return (
    <>
      <main className="sign-up-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form
          className="sign-up-form"
          autoComplete="off"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="sign-up-form__title">Sign Up</h2>
          <label className="input">
            <span className="input__heading">Full name</span>
            <input
              data-test-id="auth-full-name"
              name="full-name"
              type="text"
              onChange={handleChange}
              value={formData.fullName}
              required
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </label>
          <label className="input">
            <span className="input__heading">Email</span>
            <input
              data-test-id="auth-email"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label className="input">
            <span className="input__heading">Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <button data-test-id="auth-submit" className="button" type="submit">
            Sign Up
          </button>
        </form>
        <span>
          Already have an account?
          <Link
            data-test-id="auth-sign-in-link"
            className="sign-up-form__link"
            to="/sign-in"
          >
            Sign In
          </Link>
        </span>
      </main>
    </>
  );
};

export default SignUp;
