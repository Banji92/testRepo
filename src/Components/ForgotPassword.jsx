import React, { useState } from "react";
import Button from "./Button.jsx";
import Toastify from "./Toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");
  const baseUrl = process.env.REACT_APP_BASEURL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          triggerEvent: "confirm-reset-password",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlert(data.message);
        setTimeout(() => {}, 600);

        window.location.href = `/ResetPassword?email=${email}`;
      } else {
        setAlert(data.message);
      }
    } catch (error) {
      alert(String(error));
    }
  };

  return (
    <div className=" bg-white">
      <Toastify message={alert} />
      <div className="flex flex-col justify-center items-center h-screen gap-y-4 border mx-[20rem]">
        <div className="flex flex-col m">
          <h1 className="font-bold text-2xl">Forgot Password?</h1>
        </div>
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <label htmlFor="email" className="my-2">
              Enter your email address to reset your password.
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full my-2"
            />

            <Button
              type="submit"
              className="bg-purple-900 px-2 mx-auto"
              text="Reset Password"
            ></Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
