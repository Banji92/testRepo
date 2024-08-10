import { useEffect, useState, useCallback } from "react";
import "../../styles/LiveUpdate.css";
import SideBar from "../Explore/SideBar";
import authService from "../../Services/Auth";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/ScheduleLive.css";
import Spinner from "../Spinner";

const ScheduleForm = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const baseUrl = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();

  const getCurrentUser = useCallback(async () => {
    const response = await fetch(`${baseUrl}/auth/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setUser(data.data);
      setLoading(false);
      console.log(user, data.data);
    } else {
      console.log("Something went wrong.............");
    }
  }, [baseUrl, user]);

  useEffect(() => {
    getCurrentUser();

    const authenticated = authService.isAuthenticated();
    if (!authenticated) {
      setAuth(false);
      navigate("/");
    } else {
      setAuth(true);
    }
  }, [auth, getCurrentUser, navigate]);

  return (
    <div className="main-content flex flex-row justify-items-center items-start bg-white min-h-screen">
      <SideBar auth={auth} setAuth={setAuth} user={user} />
      <div className="flex flex-col ml-24 w-full">
        <div className="container  ">
          <div className="md:col-span-3 grid grid-cols rounded bg-gray-50 gap-4 pl-10 ">
            <div className="min-h-screen flex flex-col justify-center items-center gap-y-4">
              <form className="form-container flex flex-col items-center justify-center">
                <div className="form-group">
                  <div className="label-container">
                    <label className="label" htmlFor="webinarTitle">
                      Add webinar title:
                    </label>
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      id="webinarTitle"
                      name="webinarTitle"
                      className="input-field webinar"
                      placeholder="Add webinar title"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="label-container">
                    <label className="label" htmlFor="description">
                      Add description:
                    </label>
                  </div>
                  <div className="input-container">
                    <textarea
                      id="description"
                      name="description"
                      className="input-field description"
                      placeholder="Add description"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="label-container">
                    <label className="label" htmlFor="selectedDate">
                      Date
                    </label>
                  </div>
                  <div className="date-picker-container">
                    <DatePicker
                      id="selectedDate"
                      className="date-picker"
                      selected={new Date()}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="label-container">
                    <label className="label" htmlFor="mergedTime">
                      Select time:
                    </label>
                  </div>
                  <div className="merged-time-container">
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      className="input-field end"
                      placeholder="Start time"
                    />
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      className="input-field end"
                      placeholder="End time"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="label-container">
                    <label className="label" htmlFor="selectedTimezone">
                      Select timezone:
                    </label>
                  </div>
                  <div className="select-container">
                    <select
                      id="selectedTimezone"
                      name="selectedTimezone"
                      className="select-field zone"
                    >
                      <option value="">Select timezone</option>
                      <option value="GMT">GMT</option>
                      <option value="PST">PST</option>
                      <option value="EST">EST</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="label-container">
                    <label className="label" htmlFor="guestEmail">
                      Add guest:
                    </label>
                  </div>
                  <div className="input-container">
                    <input
                      type="email"
                      id="guestEmail"
                      name="guestEmail"
                      className="input-field guide"
                      placeholder="Add guest email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="label-container">
                    <label className="label" htmlFor="coGuestEmail">
                      Add co-guide:
                    </label>
                  </div>
                  <div className="input-container">
                    <input
                      type="email"
                      id="coGuestEmail"
                      name="coGuestEmail"
                      className="input-field guide"
                      placeholder="Add co-guide email"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className=" bg-[#37169C] rounded text-white py-2 w-[376px] hover:bg-[#0056b3]"
                >
                  {loading ? <Spinner /> : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
