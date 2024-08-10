import Spinner from "./Spinner";
import Toastify from "./Toastify";
import React, { useState } from "react";

const SignUpForm = ({
  passwordVisible,
  togglePasswordVisibility,
  rememberPassword,
  toggleRememberPassword,
  navigate,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState("");
  const baseUrl = process.env.REACT_APP_BASEURL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlert(data.message);
        setTimeout(() => {}, 600);
        setLoading(false);
        window.location.href = `/Success?email=${email}`;
      } else {
        setAlert(data.message);
        setLoading(false);
      }
    } catch (error) {
      setAlert(`Error: ${error}`);
    }
  };

  return (
    <>
      <Toastify message={alert} />
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="same">
          Email
        </label>
        <div className="input-container">
          <i className="fas fa-envelope input-icon"></i>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Johndoe@yahoo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <label htmlFor="password" className="same">
          Password
        </label>
        <div className="input-container">
          <i className="fas fa-lock input-icon"></i>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="......"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i
            className={`fas ${
              passwordVisible ? "fa-eye-slash" : "fa-eye"
            } toggle-icon`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="form-options">
          <div
            className="remember-password-container"
            onClick={toggleRememberPassword}
          >
            <div className={`checkbox ${rememberPassword ? "checked" : ""}`}>
              {rememberPassword && <i className="fas fa-check"></i>}
            </div>
            <span>Remember Password</span>
          </div>
          <div
            onClick={() => navigate("/ForgotPassword")}
            className="forgot-password-link hover:cursor-pointer"
          >
            Forgot Password?
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#37169c] w-[370px] h-[52px] border-0 p-2.5 cursor-pointer rounded-lg text-white text-base font-semibold leading-6"
        >
          {loading ? <Spinner /> : "Create an Account with Stridez"}
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
