import comment from "../../assets/icons/comment.png";
import heartfill from "../../assets/icons/heartfill.png";
import uncollect from "../../assets/icons/uncollect.png";
import eyefilled from "../../assets/icons/eyefilled.png";
import share from "../../assets/icons/share.png";
import { useEffect, useState } from "react";
import telegram from "../../assets/icons/telegram.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import SocialX from "../../assets/icons/SocialX.png";
import link from "../../assets/icons/link.png";
import "../../styles/Post.css";
import MediaWrapper from "./MediaWrapper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import TimeFormatter from "../TimeFormatter";
import Comment from "./Comment";
const baseUrl = process.env.REACT_APP_BASEURL;

/* eslint-disable react/prop-types */
const Post = ({
  resource,
  media,
  profilePic,
  title,
  author,
  pin,
  views,
  likesCount = 0, // Default value to prevent NaN
  commentsCount = 0, // Default comments count
  shares,
  className,
  description,
}) => {
  const [mediaClass, setMediaClass] = useState("media-content");
  const [shareOptions, setShareOptions] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { getAuth } = useAuth();

  // State for like count and like button state
  const [likeCount, setLikeCount] = useState(likesCount);
  const [commentCount, setCommentCount] = useState(commentsCount);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  const handleShareMouseEnter = () => {
    setShareOptions(true);
  };
  const handleShareMouseLeave = () => {
    setShareOptions(false);
  };

  const handleSubscribe = () => {
    if (!getAuth()) return navigate("/");
    setIsSubscribed(!isSubscribed);
  };

  // Handle like button click
  const handleLikeClick = async () => {
    if (!getAuth()) return navigate("/");
    try {
      const response = await fetch(
        `${baseUrl}/posts/${resource?.id}/toggle-like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.data.likesCount);
        setLikeCount(data.data.likesCount);
        // setLikeCount((resource) => resource?.likesCount + 1);
        setIsLiked((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentClick = async () => {
    navigate('/comments', { state: { resource } });
  };
  

  useEffect(() => {
    setCommentCount(commentsCount);
    const img = new Image();
    img.src = media;
    img.onload = () => {
      if (img.width > img.height) {
        setMediaClass("media-content large");
      } else {
        setMediaClass("media-content small");
      }
    };
  }, [media, commentsCount]);

  const postSideMenu = [
    {
      icon: heartfill,
      value: likeCount,
      alt: "likes",
      onClick: handleLikeClick,
      colorClass: isLiked ? "text-red-500" : "text-gray-700", // Conditional styling
    },
    {
      icon: comment,
      value: commentCount,
      alt: "comments",
      onClick: handleCommentClick,
    },
    { icon: uncollect, value: pin, alt: "pinned" },
    { icon: eyefilled, value: views, alt: "views" },
    {
      icon: share,
      value: shares,
      alt: "share",
      onMouseEnter: handleShareMouseEnter,
      onMouseLeave: handleShareMouseLeave,
    },
  ];

  const shareOptionsMenu = [
    { icon: link, alt: "Copy link", text: "Copy link" },
    { icon: whatsapp, alt: "WhatsApp", text: "Share to WhatsApp" },
    { icon: telegram, alt: "Telegram", text: "Share to Telegram" },
    { icon: SocialX, alt: "Facebook", text: "Share to Facebook" },
    { icon: SocialX, alt: "Twitter", text: "Share to Twitter" },
  ];

  const formatTime = (date) => {
    return TimeFormatter(new Date(date));
  };

  return (
    <>
      <div
        className={` bg-gray-50 p-4  rounded relative ${className} overflow-hidden flex-col justify-center items-center w-[32rem]`}
      >
        <div className="flex flex-col items-start mb-2 w-[28rem]">
          <div className="flex  justify-center w-full">
            <div className="flex">
              <img
                src={resource?.user?.profile?.avatar}
                alt={author}
                className="w-12 h-12 rounded-full mr-2"
              />
              <div className="flex flex-col ">
                <h2 className="text-lg font-bold text-gray-600 ">
                  {resource?.user?.username}
                </h2>
                <p>{formatTime(resource?.createdAt)}</p>
              </div>
            </div>

            <button
              className="ml-auto bg-white border border-purple-950 text-purple-900  h-8 w-32 rounded hover:bg-purple-200 hover:cursor-pointer px-2"
              onClick={handleSubscribe}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="text-blue-500">{resource?.body}</p>
            <h4 className="text-md font-normal text-gray-600">{resource?.title}</h4>
          </div>
        </div>
        <div className="flex justify-center items-center w-[26rem]">
          {<MediaWrapper title={resource?.title} media={resource?.thumbnailUrl} mediaClass={mediaClass} />}
          <div className="side-buttons flex flex-col items-end text-gray-700 font-bold text-xs spacing-y-1">
            {postSideMenu.map((menu, index) => (
              <div
                className={`flex flex-col mb-6 cursor-pointer relative items-center ${
                  menu.colorClass || ""
                }`}
                key={index}
                onMouseEnter={menu.onMouseEnter}
                onMouseLeave={menu.onMouseLeave}
                onClick={menu.onClick}
              >
                <div className="shadow rounded-full p-2 mb-2">
                  <img src={menu.icon} alt={menu.alt} className={` w-6 h-6`} />
                </div>
                {menu.value}
                {menu.alt === "share" && shareOptions && (
                  <div className="share-options text-xs font-normal bg-gray-50 shadow-md rounded p-4 space-y-2">
                    {shareOptionsMenu.map((option, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <img
                          src={option.icon}
                          alt={option.alt}
                          className="w-4 h-4 hover:bg-purple-200"
                        />
                        <span className="text-nowrap">{option.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
