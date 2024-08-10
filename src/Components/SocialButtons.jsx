import React from "react";

const NewGoogle = `${process.env.PUBLIC_URL}/Logo_button.jpg`;
const NewApple = `${process.env.PUBLIC_URL}/pple.png`;
const Google = `${process.env.PUBLIC_URL}/google_logo.jpg`;
const Apple = `${process.env.PUBLIC_URL}/Apple_Button.png`;
const baseUrl = process.env.REACT_APP_BASEURL;

const SocialButtons = ({ isSignIn }) => {
  const handleGoogleAuth = async () => {
    window.location.href = `${baseUrl}/auth/google/`;
  };

  return (
    <div className="button-toggle-container">
      {isSignIn ? (
        <>
          <button className="social-button" onClick={() => handleGoogleAuth()}>
            <img src={NewGoogle} alt="Google logo" />
          </button>
          <button className="social-button Apple">
            <img src={NewApple} alt="Apple logo" />
          </button>
        </>
      ) : (
        <>
          <button className="social-button" onClick={() => handleGoogleAuth()}>
            <img src={Google} alt="Google logo" />
          </button>
          <button className="social-button Apple">
            <img src={Apple} alt="Apple logo" />
          </button>
        </>
      )}
    </div>
  );
};

export default SocialButtons;
