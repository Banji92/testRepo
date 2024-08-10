import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import authService from "../Services/Auth.jsx";
import "../styles/Details.css";

// auth.js (frontend)
const HandleGoogleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("token");

      if (code) {
        localStorage.setItem("accessToken", code);

        try {
          const newlyuser = await authService.getAuthUser();
          console.log("User:", newlyuser);

          if (newlyuser && newlyuser.email) {
            console.log(
              "!newlyuser.profileSetupCompleted..",
              !newlyuser.profileSetupCompleted
            );
            if (!newlyuser.profileSetupCompleted) {
              navigate(`/SelectUseCase?email=${newlyuser.email}`);
            } else {
              navigate(`/Main`);
            }
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/"); // Redirect to home page or handle error appropriately
        }
      } else {
        console.error("No code found in URL parameters.");
      }
    };

    fetchData();
  }, [navigate]); // Dependencies for the useEffect hook

  return <p>Loading...</p>;
};

export default HandleGoogleRedirect;
