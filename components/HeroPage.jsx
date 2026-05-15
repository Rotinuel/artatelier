"use client"

import { useState, useEffect } from "react";

const videos = [
    "/a.mp4",
    "/b.mp4", 
    "/c.mp4",
    "/d.mp4",
    "/e.mp4"]

const HeroPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  useEffect(() => {
    const videoElement = document.getElementById("background-video")
    if(videoElement){
      videoElement.addEventListener("ended", handleVideoEnd)
    }
    return () => {
      if(videoElement){
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [currentVideo]);
  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev +1) % videos.length);
  };

  return (
    <div className='relative w-full h-screen overflow-hidden flex items-center justify-center z-1'>
        <video id="background-video" className="w-auto h-screen min-w-full min-h-full max-w-none object-cover" src={videos[currentVideo]} autoPlay loop={false} muted playsInline/>
      </div>
  )
}

export default HeroPage