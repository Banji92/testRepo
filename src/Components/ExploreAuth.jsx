import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const ExploreAuth = ({ isSignIn, setIsSignIn }) => {
  const navigate = useNavigate();
  const { getAuth } = useAuth();

  useEffect(() => {
    if (getAuth()) return navigate("/Explore");
  });
  return (
    <div className="explore-auth">
      <button onClick={() => navigate("/Explore")} className="explore-button">
        Explore
      </button>
      <div className="button-container">
        <button
          className={`auth-button ${isSignIn ? "active" : ""}`}
          onClick={() => setIsSignIn(true)}
        >
          Sign In
        </button>
        <button
          className={`auth-button ${!isSignIn ? "active" : ""}`}
          onClick={() => setIsSignIn(false)}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default ExploreAuth;
