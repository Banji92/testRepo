import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SplashScreen from "./SplashScreen.jsx";
import AuthForm from "./AuthForm.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import Success from "./Success.jsx";
import EmailVerify from "./EmailVerify.jsx";
import SelectUseCase from "./SelectUseCase.jsx";
import MainScreen from "./Explore/MainScreen.jsx";
import Comment from "./Explore/Comment.jsx";

import TopicSelection from "./Profile/TopicSelection.jsx";
import GuideProfile from "./Profile/GuideProfile.jsx";
import LearnerProfile from "./Profile/LearnerProfile.jsx";
import DeleteUser from "./DeleteUser.jsx";

import Welcome from "./Welcome.jsx";
import ResetPassword from "./ResetPassword.jsx";
import HandleGoogleRedirect from "./HandleGoogleRedirect.jsx";
import PasswordUpdate from "./PasswordUpdate.jsx";
import PasswordCongrat from "./PasswordCongrat.jsx";
import SubscribeTo from "./SubscribeTo.jsx";

import LiveUpdate from "./Live/LiveUpdate.jsx";
import ScheduleForm from "./Live/ScheduleForm.jsx";
import Live from "./Live/Live.jsx";
import WebinarDetails from "./Live/WebinarDetails.jsx";
import PermissionWeb from "./Live/PermissionWeb.jsx";
import PermissionGranted from "./Live/PermissionGranted.jsx";
import MutedWeb from "./Live/MutedWeb.jsx"; 
import StartWebinar from "./Live/StartWebinar.jsx"; 
import Muted from "./Live/Muted.jsx";
import StartLive from "./Live/StartLive.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../styles/Details.css";
import authService from "../Services/Auth.jsx";
import UploadVideo from "./Explore/UploadVideo.jsx";

const Auth = () => {
  return (
    <div className="details-container">
      <SplashScreen />
      <AuthForm />
    </div>
  );
};

const Details = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authenticated = authService.isAuthenticated();
    !authenticated ? setAuth(false) : setAuth(true);
  }, [auth]);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/Explore" element={<MainScreen />} />

      <Route path="/UploadVideo" element={<UploadVideo />} />
      <Route path="/SubscribeTo" element={<SubscribeTo />} />
      <Route path="/Live" element={<Live />} />
      <Route path="/PermissionWeb" element={<PermissionWeb />} />
      <Route path="/MutedWeb" element={<MutedWeb />} />
      <Route path="/Muted" element={<Muted />} />
      <Route path="/LiveUpdate" element={<LiveUpdate />} />
      <Route path="/ScheduleForm" element={<ScheduleForm />} />
      <Route path="/WebinarDetails" element={<WebinarDetails />} />
      <Route path="/StartWebinar" element={<StartWebinar />} />
      <Route path="/PermissionGranted" element={<PermissionGranted />} />
      <Route path="/StartLive" element={<StartLive/>} />
      <Route path="/comments" element={<Comment />} />

      <Route path="/DeleteUser" element={<DeleteUser />} />
      <Route path="/TopicSelection" element={<TopicSelection />} />
      <Route path="/GuideProfile" element={<GuideProfile />} />
      <Route path="/LearnerProfile" element={<LearnerProfile />} />

      <Route path="/auth/callback/google" element={<HandleGoogleRedirect />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/Success" element={<Success />} />
      <Route path="/EmailVerify" element={<EmailVerify />} />
      <Route path="/Welcome" element={<Welcome />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/PasswordUpdate/:tempToken" element={<PasswordUpdate />} />
      <Route path="/PasswordCongrat" element={<PasswordCongrat />} />
      <Route path="/SelectUseCase" element={<SelectUseCase />} />
    </Routes>
  );
};

export default Details;
