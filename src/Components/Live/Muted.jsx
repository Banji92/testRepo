import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/LiveUpdate.css';
import '../../styles/Muted.css';
import Logo from '../../assets/logo.png';
import Live from '../../assets/Live.png';
import Notification from '../../assets/Notification.png';
import Audio from '../../assets/Audio.png';
import AudioLess from '../../assets/AudioLess.png';
import Camera from '../../assets/Camera.png';
import CameraLess from '../../assets/CameraLess.png';
import SettingBar from '../../assets/SettingBar.png';
import List from '../../assets/List.png';
import Chip from '../../assets/Chip.png';
import VideoTile from '../../assets/VideoTile.png';

const Muted = () => {
  const [imageToggled1, setImageToggled1] = React.useState(false);
  const [imageToggled2, setImageToggled2] = React.useState(false);
  const [showBeneathImage, setShowBeneathImage] = React.useState(false);

  const navigate = useNavigate();

  const StartLive = () => {
    // Navigate to the live page
    navigate('/StartLive');
    console.log('Live started');

    // Create mailto link
    const recipientEmail = 'onthestreethoodbillionaire@gmail.com'; // Replace with the actual recipient's email
    const subject = 'Live Session Started';
    const body = 'A live session has started. Click the link to join: https://test-repo-flame-ten.vercel.app/StartLive';

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the mailto link in the default email client
    window.location.href = mailtoLink;
  };

  const toggleImage1 = () => {
    setImageToggled1(!imageToggled1);
    setShowBeneathImage(!showBeneathImage);
  };

  const toggleImage2 = () => {
    setImageToggled2(!imageToggled2);
    if (imageToggled1 && !imageToggled2) {
      setShowBeneathImage(true);
    } else {
      setShowBeneathImage(false);
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
          <img src={Chip} alt="Chip" />
          <img src={VideoTile} alt="Video Tile" />
        </div>
        <div className="schedule">
          <div className="container">
            <div className="md:col-span-3 grid grid-cols rounded bg-gray-50 gap-4 pl-10">
              <div className="min-h-screen flex flex-col justify-center items-center gap-y-4 pt-4">
                <div className="flex flex-col items-center">
                  <h1 className='pro'>Get Started</h1>
                  <h3 className="east">Setup your audio and video before going live</h3>
                </div>
                <div className="flex flex-col items-center space-y-4 mt-6">
                  <img src={Chip} alt="Chip" />
                  <img src={VideoTile} alt="Video Tile" />
                </div>
                <div className="flex mt-6 space-x-4">
                  <button onClick={toggleImage1}>
                    <img src={imageToggled1 ? Audio : AudioLess} alt="Toggle Image 1" />
                  </button>
                  <button onClick={toggleImage2}>
                    <img src={imageToggled2 ? Camera : CameraLess} alt="Toggle Image 2" />
                  </button>
                  <button >
                    <img src={SettingBar} alt="Setting Bar" className="recite" />
                  </button>
                </div>
                {showBeneathImage && (
                  <div className="mt-4">
                    <img src={List} alt="Beneath Image" />
                  </div>
                )}
                <div className="flex mt-6 space-x-4 w-full justify-center">
                  <button className="Ore p-2">Ore Aisha</button>
                  <button onClick={StartLive} className="Aisha text-white p-2">Go Live</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Muted;
