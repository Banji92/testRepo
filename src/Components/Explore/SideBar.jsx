import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import SVG1 from "../../assets/icons/SVG1.svg";
import SVG from "../../assets/icons/SVG.svg";
import userIcon from "../../assets/icons/user.svg";
import analytics from "../../assets/icons/Analytics.svg";
import courseManagement from "../../assets/icons/CourseManagement.svg";
import uploadVideo from "../../assets/icons/UploadVideo.svg";
import Calender from "../../assets/icons/Calender.svg";
import logo from "../../assets/logo.png";
import video from "../../assets/icons/video.png";
import personicon from "../../assets/icons/personicon.png";
import Divider from "../../assets/Divider.png";
import authService from "../../Services/Auth";
import Toastify from "../Toastify";
import Spinner from "../Spinner";

const Sidebar = ({ auth, setAuth, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // State for active menu item

  const handleLogout = () => {
    if (auth) {
      authService.logout();
      setAlert("Logged out Successfully");
      setAuth(false);
      navigate("/Explore");
    } else {
      navigate("/");
    }
  };

  const handleNav = (index, link) => {
    setActiveIndex(index); // Set active index when an item is clicked
    navigate(link);
  };

  const learnersAndExplorerMenuItems = useMemo(
    () => [
      { title: "Explore For You", icon: SVG1, tag: "", link: "/" },
      { title: "Following", icon: SVG, tag: "New", link: "/Following" },
      { title: "Subscribe to", icon: userIcon, tag: "", link: "/SubscribeTo" },
      { title: "LIVE", icon: video, tag: "", link: "/Live" },
      { title: "Profile", icon: personicon, tag: "", link: "/LearnerProfile" },
    ],
    []
  );

  const guidesMenuItems = useMemo(
    () => [
      { title: "LIVE", icon: video, tag: "", link: "/Live" },
      {
        title: "Upload Video",
        icon: uploadVideo,
        tag: "",
        link: "/UploadVideo",
      },
      { title: "Calender", icon: Calender, tag: "", link: "/Calender" },
      {
        title: "Course Management",
        icon: courseManagement,
        tag: "",
        link: "/CourseManagement",
      },
      { title: "Analytics", icon: analytics, tag: "", link: "/Analytics" },
      { title: "Explore For You", icon: SVG1, tag: "", link: "/" },
      { title: "Profile", icon: personicon, tag: "", link: "/Profile" },
    ],
    []
  );

  useEffect(() => {
    if (user && user.role && user.role === "creator") {
      setMenuItems(guidesMenuItems);
      setLoading(false);
    } else if (auth && auth && user && user.role === "creator") {
      localStorage.setItem("role", user.role);
      setMenuItems(guidesMenuItems);
      setLoading(false);
    } else {
      setMenuItems(learnersAndExplorerMenuItems);
      setLoading(false);
    }
  }, [user, guidesMenuItems, learnersAndExplorerMenuItems, auth]);

  return (
    <>
      <Toastify message={alert} />
      <div className="sidebar fixed top-0 left-0 h-full grid grid-rows-[auto,1fr,auto] justify-start items-center gap-y-4 px-5 bg-white pb-8 border">
        <div className="mb-6">
          <div className="flex items-center justify-start pb-4">
            <img src={logo} alt="Logo" className="w-40 h-14 py-2" />
          </div>

          <ul className="mt-2">
            <div className="gap-y-2">
              {loading ? (
                <div className="flex items-center justify-center pt-10">
                  <Spinner className={"text-purple-600"} />
                </div>
              ) : (
                menuItems.map((item, index) => (
                  <li
                    onClick={() => {
                      if (item.title === "LIVE" && !auth) {
                        handleNav(index, "/Auth");
                      } else {
                        handleNav(index, item.link);
                      }
                    }}
                    className={`py-1 flex items-center rounded-lg p-2 hover:cursor-pointer h-12 ${
                      activeIndex === index
                        ? "bg-blue-50 text-blue-700" // Active button style
                        : "hover:text-blue-700 hover:bg-blue-50"
                    }`}
                    key={index}
                  >
                    <img src={item.icon} alt="" className="mr-2" />
                    <span className="ml-2">{item.title}</span>
                    {item.tag && (
                      <span className="ml-auto text-sm bg-blue-100 text-blue-900 rounded-full px-2 py-0.5">
                        {item.tag}
                      </span>
                    )}
                  </li>
                ))
              )}
            </div>
          </ul>
        </div>

        <img src={Divider} alt="Horizontal Divider" className="my-1" />

        <div className="mt-4">
          {!auth && (
            <p className="text-gray-500 mb-2 text-xs">
              Log in to follow Guides, like videos, and view comments.
            </p>
          )}
          <button
            className="w-full bg-transparent text-gray-400 px-4 py-2 rounded border-2 border-purple-700 hover:bg-gray-500"
            onClick={handleLogout}
          >
            {auth ? "Logout" : "Log in"}
          </button>
        </div>

        <div className="mt-2">
          <ul className="flex text-xs text-gray-600">
            <li className="py-1">
              <Link to="/explore">Company</Link>
            </li>
            <li className="py-1 px-2">About</li>
            <li className="py-1">Contact</li>
          </ul>
          <ul className="grid grid-cols-4 items-center justify-center text-xs text-gray-600 gap-y-1 mt-4">
            <li className="hover:font-bold hover:cursor-pointer">Help</li>
            <li className="hover:font-bold hover:cursor-pointer">Safety</li>
            <li className="hover:font-bold hover:cursor-pointer">Privacy</li>
            <li className="hover:font-bold hover:cursor-pointer">Center</li>
            <li className="text-xs mb-2 hover:font-bold hover:cursor-pointer">
              Terms & Policies
            </li>
          </ul>
          <div className="mt-2 text-xs text-gray-500">
            <p>Community Guidelines</p>
            <p className="mt-2">© 2024 STRIDEZ</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
