import React from "react";
import Button from "./Button.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Congrats = `${process.env.PUBLIC_URL}/Congrats.png`;

const PasswordCongrat = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleExplore = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="h-screen flex">
        <div className="flex-1 flex flex-col justify-center items-center gap-y-4 border mx-[20rem] bg-white">
          <div className="h-20 w-20">
            <img src={Congrats} alt="congrats" />
          </div>

          <div className="gap-y-4">
            <p className="font-bold text-2xl py-4">Hey, {email} </p>
            <p className="py-4">
              Successful! Your new password has been successfully updated
            </p>

            <div onClick={() => handleExplore()}>
              <Button
                type="submit"
                className="bg-purple-900 px-2"
                text="Back to sign in"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCongrat;
