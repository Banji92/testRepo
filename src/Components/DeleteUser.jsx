import React, { useState } from "react";
import Button from "./Button.jsx";
import Toastify from "./Toastify.jsx";

const DeleteUser = () => {
  const [userEmail, setUserEmail] = useState("");
  const [alert, setAlert] = useState("");
  const baseUrl = process.env.REACT_APP_BASEURL;


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/auth/${userEmail}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();
      if (response.ok) {
        setAlert(data.message);
        setTimeout(() => {}, 600);

        window.location.href = `/Auth`;
      } else {
        setAlert(data.messge);
      }
    } catch (error) {
      setAlert(String(error));
    }
  };

  return (
    <div>
      <Toastify message={alert} />

      <div className="flex flex-col justify-center items-center text-center border mx-[20rem] h-screen bg-white">
        <div>
          <form onSubmit={handleSubmit}>
            <label className="font-bold text-2xl">
             Delete User By Email
            </label>
            <div>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  className=" w-full h-[3em] text-center input-no-spinner  border rounded-lg border-black mx-2 my-4"
                />
            </div>
            <Button
              type="submit"
              className="bg-purple-900 px-2"
              text="Submit"
            ></Button>
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
