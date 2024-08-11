import { useState } from "react";
import "../../styles/LiveUpdate.css";
import Navbar from "../Explore/Navbar";
import SideBar from "../Explore/SideBar";
import Dropdown from "../Explore/Dropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";

const Live = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth, setAuth, getCurrentUser, getAuth } = useAuth();
  const [activeMode, setActiveMode] = useState('live');
  const [loading, setLoading] = useState(true);
  // const baseUrl = process.env.REACT_APP_BASEURL;

  const navigate = useNavigate();
 
  console.log("getCurrentUser", getCurrentUser());
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <div className="main-content flex flex-row justify-items-center items-start bg-white min-h-screen">
      <SideBar auth={getAuth()} setAuth={setAuth} user={getCurrentUser()} />
      <div className="flex flex-col ml-24 w-full">
        <Navbar
          toggleDropdown={toggleDropdown}
          auth={getAuth()}
          setAuth={setAuth}
          user={getCurrentUser()}
        />
        {isDropdownOpen && <Dropdown auth={auth} setAuth={setAuth} />}
        <div className="container  ">
          <div className="md:col-span-3 grid grid-cols rounded bg-gray-50 gap-4 pl-10 ">
            <div className="min-h-screen flex flex-col justify-center items-center gap-y-4 pt-10">
            <div className="flex flex-col items-center">
              <h1 className='pro'>Select Your Conference Mode</h1>
              <h3 className="east">Choose between live or web conferencing to suit your needs</h3>
              </div>

              <div className="relative flex border rounded-lg overflow-hidden button-group">
                  <button
                    onClick={() => setActiveMode('live')}
                    className={`button ${activeMode === 'live' ? 'active' : ''}`}
                  >
                    Live  Streaming
                  </button>
                  <button
                    onClick={() => setActiveMode('web')}
                    className={`button ${activeMode === 'web' ? 'active' : ''}`}
                  >
                    Web Streaming
                  </button>
                </div>

                
                {activeMode === 'live' && (
                  <div className="flex flex-col items-center gap-y-4 pt-10">
                    <h1>Engage face to face in real time</h1>
                    <div className="flex flex-col gap-4">
                      <button
                         onClick={() => navigate('/PermissionGranted')}
                        className="p-2 rounded   reason "
                      >
                        Start an instant Live
                      </button>
                      <button
                        onClick={() => navigate('/ScheduleForm')}
                        className="p-2 rounded  reason "
                      >
                        Schedule with Calendar
                      </button>
                    </div>
                  </div>
                )}

{activeMode === 'web' && (
                  <div className="flex flex-col items-center gap-y-4 pt-10">
                    <h1>Running a webinar with your students</h1>
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => navigate('/PermissionWeb')}
                        className="p-2 rounded reason"
                      >
                        Start Webinar
                      </button>
                      <button
                        onClick={() => navigate('/ScheduleForm')}
                        className="p-2 rounded reason"
                      >
                        Schedule with Calendar Like
                      </button>
                    </div>
                  </div>
                )}
               
            
              
             
             
            

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
