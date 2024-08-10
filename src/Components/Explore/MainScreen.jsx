import { useEffect, useState, useCallback } from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import SideBar from "./SideBar";
import Dropdown from "./Dropdown";
import { useAuth } from "../../Providers/AuthProvider";

import Search from "./Search";

const MainScreen = () => {
  const { auth, setAuth, getCurrentUser, getAuth } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const baseUrl = process.env.REACT_APP_BASEURL;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/posts?page=1&&limit=20`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setVideos(data.data.posts);
        console.log(data.data.posts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [baseUrl]);

  useEffect(() => {
    console.log("getCurrentUser, getAuth", getCurrentUser(), getAuth());
    fetchVideos();
  }, [fetchVideos, getAuth, getCurrentUser]);
  

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
        <div className="container ">
          <div className="md:col-span-3 grid grid-cols rounded bg-gray-50 gap-4 pl-10 w-full">
            {videos.length < 1 || loading ?   (
              <div className="w-[32rem]">
                <div className="animate animate-pulse col-span-1 py-2 rounded border h-screen">
                  <div className="flex w-full px-2 justify-center items-center">
                    <div className="h-14 w-14 bg-slate-400 rounded-full"></div>
                    <div className="flex flex-col gap-y-2 mx-2 flex-1">
                      <div className="flex">
                        <p className="mr-2 bg-slate-400 h-8 w-full rounded-lg"></p>
                        <p className="ml-auto  bg-slate-400 h-8 w-[10rem] rounded-lg"></p>
                      </div>
                      <div className=" bg-slate-400 h-6 w-full rounded-lg"></div>
                      <div className=" bg-slate-400 h-6 w-full rounded-lg"></div>
                    </div>
                  </div>
                  <div className="mt-4 ml-[4rem] w-[26rem] h-[80vh] bg-slate-400 rounded-lg"></div>
                </div>

                <div className="animate animate-pulse col-span-1 py-2 rounded border h-screen">
                  <div className="flex w-full px-2 justify-center items-center">
                    <div className="h-14 w-14 bg-slate-400 rounded-full"></div>
                    <div className="flex flex-col gap-y-2 mx-2 flex-1">
                      <div className="flex">
                        <p className="mr-2 bg-slate-400 h-8 w-full rounded-lg"></p>
                        <p className="ml-auto  bg-slate-400 h-8 w-[10rem] rounded-lg"></p>
                      </div>
                      <div className=" bg-slate-400 h-6 w-full rounded-lg"></div>
                      <div className=" bg-slate-400 h-6 w-full rounded-lg"></div>
                    </div>
                  </div>
                  <div className="mt-4 ml-[4rem] w-[26rem] h-[80vh] bg-slate-400 rounded-lg"></div>
                </div>

                <div className="animate animate-pulse col-span-1 py-2 rounded border h-screen">
                  <div className="flex w-full px-2 justify-center items-center">
                    <div className="h-14 w-14 bg-slate-400 rounded-full"></div>
                    <div className="flex flex-col gap-y-2 mx-2 flex-1">
                      <div className="flex">
                        <p className="mr-2 bg-slate-400 h-8 w-full rounded-lg"></p>
                        <p className="ml-auto  bg-slate-400 h-8 w-[10rem] rounded-lg"></p>
                      </div>
                      <div className=" bg-slate-400 h-6 w-full rounded-lg"></div>
                      <div className=" bg-slate-400 h-6 w-full rounded-lg"></div>
                    </div>
                  </div>
                  <div className="mt-4 ml-[4rem] w-[26rem] h-[80vh] bg-slate-400 rounded-lg"></div>
                </div>
              </div>
            ) : (
              videos &&
              videos.map((video, index) => {
                return (
                  <Post
                    key={index}
                    resource={video}
                    className="col-span-1 py-2 rounded border"
                    media={video.thumbnailUrl}
                    profilePic={video.thumbnailUrl}
                    title={video.title}
                    description={video.body}
                    author="John Doe"
                    likesCount={video.likesCount}
                    commentsCount={video.commentsCount}
                    pin={188.9}
                    views={202.2}
                    shares={202.2}
                  />
                );
              })
            )}
            {/* <Post
              // key={index}
              resource={""}
              // className="col-span-1 md:w-2/3 py-2 rounded border"
              className="col-span-1 py-2 rounded border"
              media={imageBike}
              profilePic={userpix}
              title={"Some title here....."}
              description={"#something1 #something1 #something1"}
              author="John Doe"
              likesCount={20}
              commentsCount={10}
              pin={188.9}
              views={202.2}
              shares={202.2}
            /> */}
            {isDropdownOpen && <Dropdown auth={auth} setAuth={setAuth} />}
            {isSearchOpen && <Search />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
