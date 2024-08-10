import React, { useRef, useState, useEffect } from "react";
import "../../styles/Post.css";
import Spinner from "../Spinner";

const MediaWrapper = ({ media, title, mediaClass }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isImage = (url) =>
    /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.error("Autoplay prevented:", error);
            });
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the video is visible
    );

    observer.observe(video);

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch((error) => {
        console.error("Play error:", error);
      });
      setIsPlaying(true);
    } else if (video) {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += 10; // Skip forward 10 seconds
    }
  };

  const handleBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime -= 10; // Skip backward 10 seconds
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const currentTime = video.currentTime;
      const duration = video.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handlePlaying = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    console.error("Error loading video");
  };

  return (
    <div className="min-h-[40rem] max-h-[46rem] w-[26rem] bg-black rounded-lg mr-2">
      {isImage(media) ? (
        <div className="relative h-auto min-h-[39rem] max-h-[46rem] w-full bg-black rounded-lg mr-8 pt-full overflow-hidden">
          <img
            src={media}
            alt={title}
            className={`media-content small w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          />
        </div>
      ) : (
        <div
          className="media-content  flex relative h-auto min-h-[39rem] max-h-[46rem] w-full bg-black rounded-lg mr-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Spinner/>
            </div>
          )}
          <video
            ref={videoRef}
            src={media}
            className={`w-full h-auto rounded ${mediaClass}`}
            onTimeUpdate={handleTimeUpdate}
            onWaiting={handleWaiting}
            onPlaying={handlePlaying}
            onError={handleError}
            autoPlay={true} // Autoplay enabled when visible
            muted={!isPlaying} // Muted to comply with autoplay policies
            onClick={handlePlayPause} // Click to toggle play/pause
          />
          {showControls && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center py-2 flex-col mb-10">
              <div className="inline-flex gap-x-4">
                <button
                  onClick={handleBackward}
                  className="bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-6-6m0 0l6-6m-6 6h18"
                    />
                  </svg>
                </button>
                <button
                  onClick={handlePlayPause}
                  className="bg-white rounded-full p-3"
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-6.505-3.752A1 1 0 007 8.305v7.39a1 1 0 001.247.936l6.505-3.752a1 1 0 000-1.736z"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={handleForward}
                  className="bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 8l6 6m0 0l-6 6m6-6H3"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative w-full h-1 bg-gray-800 mt-2">
                <div
                  className="absolute left-0 top-0 h-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaWrapper;
