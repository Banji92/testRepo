import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen.jsx";
import Button from "./Button.jsx";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider.jsx";
const Congrats = `${process.env.PUBLIC_URL}/Congrats.png`;

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const { getCurrentUser, getAuth } = useAuth();

  const handleExplore = async (e) => {
    e.preventDefault();
    const user = getCurrentUser();

    if (!user.profileSetupCompleted) {
      window.location.href = `/SelectUseCase?email=${email}`;
    } else {
      navigate(`/Explore`);
    }
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (!user.profileSetupCompleted) {
      window.location.href = `/SelectUseCase?email=${email}`;
    } else {
      navigate(`/Main`);
    }

    const authenticated = getAuth();
    if (!authenticated) {
      navigate(`/`);
    }
  });

  return (
    <div>
      <div className="flex">
        <div className="flex w-[40%]">
          <SplashScreen />
        </div>

        <div className="flex-1 flex flex-col my-20 px-10  justify-center items-center gap-y-4">
          <div className="h-20 w-20">
            <img src={Congrats} alt="congrats" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 text-pretty">
            <p className="font-bold text-2xl py-4">Hey, {email} </p>
            <p className="w-1/2">
              Congratulations! Your account has been successfully verified.
              Let's Personalize the app for your usecase to enhance your
              experience
            </p>
            <p></p>

            <div onClick={(e) => handleExplore(e)}>
              <Button
                type="submit"
                className="bg-purple-900 px-2"
                text="Set up your profile"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
