import React, { useState } from "react";
import Button from "./Button.jsx";
import { useLocation } from "react-router-dom";
import Toastify from "./Toastify";

const ResetPassword = () => {
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [alert, setAlert] = useState("");
  const baseUrl = process.env.REACT_APP_BASEURL;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleChange = (e, index) => {
    const newCodeDigits = [...codeDigits];
    newCodeDigits[index] = e.target.value;
    setCodeDigits(newCodeDigits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = codeDigits.join("");

    try {
      const response = await fetch(`${baseUrl}/auth/validate-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationCode,
          triggerEvent: "confirm-reset-password",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlert(data.message);
        setTimeout(() => {}, 600);

        window.location.href = `/PasswordUpdate/${data.data.token}`;
      } else {
        setAlert(data.messge);
      }
    } catch (error) {
      setAlert(String(error));
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          triggerEvent: "reset-creation",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlert(data.message);
      } else {
        setAlert(data.message);
      }
    } catch (error) {
      setAlert(error);
    }
  };

  return (
    <div>
      <Toastify message={alert} />

      <div className="flex flex-col justify-center items-center text-center border mx-[20rem] h-screen bg-white">
        <div>
          <form onSubmit={handleSubmit}>
            <label className="font-bold text-2xl">
              Enter Verification Code
            </label>
            <div>
              {codeDigits.map((digit, index) => (
                <input
                  key={index}
                  type="number"
                  min="0"
                  max="9"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className=" w-[3em] h-[3em] text-center input-no-spinner  border rounded-lg border-black mx-2 my-4"
                />
              ))}
            </div>
            {/* <button type="submit" style={buttonStyle}>
              Submit
            </button> */}
            <Button
              type="submit"
              className="bg-purple-900 px-2"
              text="Submit"
            ></Button>
            <p
              className="text-purple-900 underline py-4 hover:cursor-pointer"
              onClick={(e) => handleResendOtp(e)}
            >
              Resend a new code
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
