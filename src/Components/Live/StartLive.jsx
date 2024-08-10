import React, { useState, useRef } from "react";
import '../../styles/LiveUpdate.css';
import Logo from '../../assets/logo.png';
import Live from '../../assets/Live.png';
import AuthIcons from '../../assets/AuthIcons.png';
import Analytics from '../../assets/Analytics.png';
import Calendar from '../../assets/Calendar.png';
import CourseManage from '../../assets/CourseManage.png';
import ExploreFor from '../../assets/ExploreFor.png';
import HorizontalDivider from '../../assets/HorizontalDivider.png';
import Notification from '../../assets/Notification.png';
import Profile from '../../assets/Profile.png';
import UploadVideo from '../../assets/UploadVideo.png';
import Audio from '../../assets/Audio.png';
import AudioLess from '../../assets/AudioLess.png';
import Panel from '../../assets/Panel.png';
import Camera from '../../assets/Camera.png';
import CameraLess from '../../assets/CameraLess.png';
import SettingBar from '../../assets/SettingBar.png';
import Pic from '../../assets/pic.png';
import RightControls from '../../assets/RightControls.png';
import Emoji from '../../assets/Emoji.png';
import Adjust from '../../assets/Adjust.png';
import talk from '../../assets/talk.png';
import Hamburger from '../../assets/Hamburger.png';
import Group from '../../assets/group.png';
import NotificationIcon from '../../assets/Request.png';
import End from '../../assets/End.png';
import Left from '../../assets/Left.png';
import AdditionalPerson from '../../assets/AdditionalPerson.png';
import { useNavigate } from "react-router-dom";

const StartLive = () => {
  const [imageToggled1, setImageToggled1] = useState(false);
  const [imageToggled2, setImageToggled2] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showAdjustImage, setShowAdjustImage] = useState(false);
  const [showLeftImage, setShowLeftImage] = useState(false);
  const [requestToJoin, setRequestToJoin] = useState(false);
  const [showAdditionalImage, setShowAdditionalImage] = useState(false);

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const toggleImage1 = () => {
    setImageToggled1(!imageToggled1);
  };

  const toggleImage2 = () => {
    setImageToggled2(!imageToggled2);
    if (!imageToggled2) {
      startVideo();
    } else {
      stopVideo();
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const toggleAdjustImage = () => {
    setShowAdjustImage(!showAdjustImage);
  };

  const handleEndClick = () => {
    setShowLeftImage(true);
  };

  const handleRequestToJoin = () => {
    setRequestToJoin(true);
  };

  const handleJoinClick = () => {
    setShowAdditionalImage(true);
    setRequestToJoin(false);
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (err) {
      console.error("Error accessing webcam: ", err);
    }
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <div>
      <div className='head'>
        <img src={Logo} alt="Logo" />
        <div className='input-container'>
          <input placeholder="search" className="pray" />
          <img src={AuthIcons} alt="Auth Icons" />
        </div>
        <img src={Notification} alt="Notification" />
      </div>
      <div className="state">
        <div className="part">
          <img src={Live} alt="Live" />
          <img src={UploadVideo} alt="UploadVideo" />
          <img src={Calendar} alt="Calendar" />
          <img src={CourseManage} alt="Course Manage" />
          <img src={Analytics} alt="Analytics" />
          <img src={ExploreFor} alt="Explore For" />
          <img src={Profile} alt="Profile" />
          <img src={HorizontalDivider} alt="Horizontal Divider" />
        </div>
        <div className="schedule">
          <div className="container">
            <div className="md:col-span-3 grid grid-cols-1 gap-4 bg-gray-50 pl-10">
              <div className="min-h-screen flex justify-center items-center gap-x-4 pt-10 relative">
                <div className="relative flex justify-center items-center bg-black" style={{ width: '1105px', height: '697px' }}>
                  {showLeftImage ? (
                    <img src={Left} alt="Left" style={{ width: '100%', height: '100%' }} />
                  ) : (
                    <div className="relative flex">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        style={{
                          width: showAdditionalImage ? '493px' : '1000px',
                          height: showAdditionalImage ? '277px' : '600px',
                          border: '4px',
                          display: imageToggled2 ? 'block' : 'none'
                        }}
                      ></video>
                      {showAdditionalImage && (
                        <img
                          src={AdditionalPerson}
                          alt="Additional Person"
                          style={{
                            width: '493px',
                            height: '277px',
                            border: '4px',
                            marginLeft: '4px'
                          }}
                        />
                      )}
                      <img src={RightControls} alt="People Count" className="absolute top-0 right-0 mt-2 mr-2" />
                      {requestToJoin && (
                        <button onClick={handleJoinClick} className="absolute bottom-0 left-0 mb-2 ml-2 text-white bg-black p-2">
                          Request to Join Live
                        </button>
                      )}
                      {showAdjustImage && (
                        <img src={End} alt="Adjust Image" className="absolute inset-0 m-auto" style={{ width: '360px', height: '184px', border: '16px' }} onClick={handleEndClick} />
                      )}
                    </div>
                  )}
                </div>
                {showChat && !showLeftImage && (
                  <div className="relative ml-4" style={{ height: '100%' }}>
                    <img src={Panel} alt="Chat" style={{ width: '400px', height: '100%', border: '4px' }} />
                  </div>
                )}
              </div>
              <div className="flex space-x-4 mt-4">
                <button onClick={toggleImage1}>
                  <img src={imageToggled1 ? Audio : AudioLess} alt="Toggle Audio" />
                </button>
                <button onClick={toggleImage2}>
                  <img src={imageToggled2 ? Camera : CameraLess} alt="Toggle Camera" />
                </button>
                <img src={Emoji} alt="Emoji" />
                <button onClick={toggleAdjustImage}>
                  <img src={Adjust} alt="Adjust" />
                </button>
                <button onClick={toggleChat}>
                  <img src={talk} alt="Toggle Chat" />
                </button>
                <button>
                  <img src={Group} alt="Toggle Hamburger" />
                </button>
                <img src={Hamburger} alt="Other" />
                <button onClick={handleRequestToJoin}>
                  Request to Join Live
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLive;
