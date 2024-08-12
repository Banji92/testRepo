import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../../styles/LiveUpdate.css';
import Logo from '../../assets/logo.png';
import Live from '../../assets/Live.png';
import Notification from '../../assets/Notification.png';
import Audio from '../../assets/Audio.png';
import AudioLess from '../../assets/AudioLess.png';
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

const StartLive = () => {
  const [imageToggled1, setImageToggled1] = useState(false);
  const [imageToggled2, setImageToggled2] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showAdjustImage, setShowAdjustImage] = useState(false);
  const [showLeftImage, setShowLeftImage] = useState(false);
  const [requestToJoin, setRequestToJoin] = useState(false);
  const [showAdditionalImage, setShowAdditionalImage] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [peerConnections, setPeerConnections] = useState([]);
  const [ws, setWs] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const localStream = useRef(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('sessionId');

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://localhost:5000');
    setWs(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      handleWebSocketMessage(data);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Join the live session with the session ID
    if (sessionId) {
      ws.send(JSON.stringify({ type: 'join', sessionId }));
      console.log('Joined live session with ID:', sessionId);
    }
  }, [sessionId, ws]);

  useEffect(() => {
    // Fetch the number of connected users
    const fetchConnectedUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/connected-users'); // Adjust the URL based on your backend
        const users = await response.json();
        setConnectedUsers(users);
        console.log('Number of connected users:', users.length);
      } catch (error) {
        console.error('Error fetching connected users:', error);
      }
    };

    // Fetch connected users initially and on any relevant update
    fetchConnectedUsers();
  }, [ws]);

  const handleWebSocketMessage = (data) => {
    const peerConnection = new RTCPeerConnection();
    peerConnections.push(peerConnection);

    if (data.type === 'offer') {
      console.log('Received offer:', data.offer);
      peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      peerConnection.createAnswer().then(answer => {
        peerConnection.setLocalDescription(answer);
        ws.send(JSON.stringify({ type: 'answer', answer }));
      });
    } else if (data.type === 'answer') {
      console.log('Received answer:', data.answer);
      peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    } else if (data.type === 'ice-candidate') {
      console.log('Received ICE candidate:', data.candidate);
      peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }

    peerConnection.ontrack = (event) => {
      console.log('Remote track received:', event.streams[0]);
      const remoteVideo = document.createElement('video');
      remoteVideo.srcObject = event.streams[0];
      remoteVideo.autoplay = true;
      remoteVideo.style.width = '493px';
      remoteVideo.style.height = '277px';
      document.body.appendChild(remoteVideo);
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate:', event.candidate);
        ws.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }));
      }
    };
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Local video stream started:', stream);
      videoRef.current.srcObject = stream;
      localStream.current = stream;
    } catch (err) {
      console.error('Error accessing webcam:', err);
    }
  };

  const stopVideo = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
      localStream.current = null;
      console.log('Local video stream stopped');
    }
  };

  return (
    <div>
      <div className='head'>
        <img src={Logo} alt="Logo" />
        <div className='input-container'>
          <input placeholder="search" className="pray" />
          <img src={Notification} alt="Notification" />
        </div>
      </div>
      <div className="state">
        <div className="part">
          <img src={Live} alt="Live" />
          <img src={UploadVideo} alt="Upload Video" />
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
                        <video
                          autoPlay
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
                <button onClick={toggleAdditionalImage}>
                  <img src={AdditionalPerson} alt="Additional Person" />
                </button>
              </div>
              <button onClick={fetchConnectedUsers} className="btn btn-primary">List Connected Users</button>
              {connectedUsers.map(user => (
                <div key={user.id}>
                  <p>{user.username}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLive;
