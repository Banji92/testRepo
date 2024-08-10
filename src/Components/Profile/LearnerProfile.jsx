import { useState, useRef, useEffect } from "react";
import userpix from "../../assets/userpix.png";
import profilepix from "../../assets/profilepix.png";
import Socket from "./Socket";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Toastify from "../Toastify";
import { useAuth } from "../../Providers/AuthProvider";
import Spinner from "../Spinner";

const LearnerProfileSetup = () => {
  const { getAuth, getCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();


  const fileInputRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASEURL;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setImage(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Add your logic to update the profile here
    const [firstName, lastName] = name.split(" ");
    const formdata = new FormData();
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    formdata.append("username", username);
    formdata.append("bio", bio);
    formdata.append("role", role);
    formdata.append("avatar", image);

    const response = await fetch(`${baseUrl}/profiles`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formdata,
    });

    const data = await response.json();
    if (!response.ok) {
      setAlert(data.message);
    } else {
      setAlert(data.message);
      setAuth(true, data.data);

      setTimeout(() => {}, 600);
      window.location.href = "/TopicSelection";
    }
  };

  useEffect(() => {
    if (!getAuth()) return navigate("/");
    const user = getCurrentUser();
    if (user.role  && !user.role.toLowerCase()=== 'none') return navigate("/Explore");
  });

  return (
    <div>
      <Toastify message={alert} />
      <div className="flex flex-col lg:flex-row max-h-screen m-4 lg:m-10 gap-x-8 lg:gap-x-20 bg-white rounded-lg overflow-hidden py-4 scale-100">
        <div className="w-full lg:w-1/2 relative">
          <img
            src={profilepix}
            alt="Page"
            className="w-full h-64 lg:h-full object-cover rounded-lg"
          />
          <div className="h-40 absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-6 rounded-b-lg">
            <h2 className="text-white text-3xl font-bold">
              Set up your profile
            </h2>
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-4 lg:px-16 flex-1 shadow-md rounded-lg overflow-auto">
          <h2 className="text-3xl font-bold mt-4 mb-6">Set up your profile</h2>

          <form onSubmit={handleUpdateProfile}>
            {/* Image section */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
                Avatar
              </label>
              <div className="flex flex-col md:flex-row items-center justify-start gap-x-6 py-4 gap-y-4">
                <img
                  src={profileImage || userpix}
                  alt="Display"
                  className="w-20 h-20 rounded-full mr-4 bg-blue-200 cursor-pointer"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                  id="profileImageInput"
                />
                <div className="flex flex-col">
                  <button
                  type="button"
                    className="w-full lg:w-3/4 border border-gray-200 bg-transparent hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded"
                    onClick={handleImageClick}
                  >
                    Upload new image
                  </button>
                  <p className="w-full lg:w-3/4 text-gray-500 text-xs mt-2">
                    At least 800x800 px recommended. JPG, PNG, and GIF are
                    allowed.
                  </p>
                </div>
              </div>
            </div>

            {/* Name and username section */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12"
                placeholder="OreAlisha"
              />
              {username && (
                <Socket username={username} className="overflow-clip" />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12"
                placeholder="Ore Alisha"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bio (*)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                placeholder="Short bio"
              />
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className=" w-full bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline 
          
             "
              >
                {loading ? <Spinner /> : "Save and Continue"}
                </button>
              <button className="w-full mt-4 text-gray-500 text-sm  border-1 border-slate-800 py-2 rounded-lg shadow-sm">
                <Link to="/">Skip to do these later</Link>
              </button>
            </div>
            <p className=" w-full px-10 text-center text-gray-500 text-xs mt-2">
              You can skip this process now. Later you can set up your profile
              in the profile settings.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LearnerProfileSetup;
