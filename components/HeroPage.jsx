"use client"

import { useRef, useEffect, useState } from "react";

const videos = [
  "/a.mp4",
  "/b.mp4",
  "/c.mp4",
  "/d.mp4",
  "/e.mp4",
];

const HeroPage = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [fading, setFading] = useState(false);
  const currentRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const video = currentRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      const nextIndex = (current + 1) % videos.length;
      setNext(nextIndex);

      // Pre-load and start the next video silently underneath
      const nextVideo = nextRef.current;
      if (nextVideo) {
        nextVideo.src = videos[nextIndex];
        nextVideo.load();
        nextVideo.play();
      }

      // Trigger fade
      setFading(true);

      setTimeout(() => {
        setCurrent(nextIndex);
        setFading(false);
      }, 800); // match transition duration
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => video.removeEventListener("ended", handleVideoEnd);
  }, [current]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Next video — sits underneath */}
      <video
        ref={nextRef}
        className="absolute inset-0 w-auto h-screen min-w-full min-h-full max-w-none object-cover"
        src={videos[next]}
        muted
        playsInline
        preload="auto"
      />

      {/* Current video — fades out on top */}
      <video
        ref={currentRef}
        className="absolute inset-0 w-auto h-screen min-w-full min-h-full max-w-none object-cover transition-opacity duration-800"
        style={{ opacity: fading ? 0 : 1 }}
        src={videos[current]}
        autoPlay
        loop={false}
        muted
        playsInline
      />
    </div>
  );
};

export default HeroPage;

// "use client"

// import { useRef, useEffect } from "react";

// const videos = [
//   "/a.mp4",
//   "/b.mp4",
//   "/c.mp4",
//   "/d.mp4",
//   "/e.mp4",
// ];

// const HeroPage = () => {
//   const videoRef = useRef(null);
//   const indexRef = useRef(0);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handleVideoEnd = () => {
//       indexRef.current = (indexRef.current + 1) % videos.length;
//       video.src = videos[indexRef.current];
//       video.play();
//     };

//     video.addEventListener("ended", handleVideoEnd);
//     return () => video.removeEventListener("ended", handleVideoEnd);
//   }, []);

//   return (
//     <div className="relative w-full h-screen overflow-hidden flex items-center justify-center z-1">
//       <video
//         ref={videoRef}
//         className="w-auto h-screen min-w-full min-h-full max-w-none object-cover"
//         src={videos[0]}
//         autoPlay
//         loop={false}
//         muted
//         playsInline
//       />
//     </div>
//   );
// };

// export default HeroPage;

// // "use client"

// // import { useState, useEffect } from "react";

// // const videos = [
// //     "/a.mp4",
// //     "/b.mp4", 
// //     "/c.mp4",
// //     "/d.mp4",
// //     "/e.mp4"]

// // const HeroPage = () => {
// //   const [currentVideo, setCurrentVideo] = useState(0);
// //   useEffect(() => {
// //     const videoElement = document.getElementById("background-video")
// //     if(videoElement){
// //       videoElement.addEventListener("ended", handleVideoEnd)
// //     }
// //     return () => {
// //       if(videoElement){
// //         videoElement.removeEventListener("ended", handleVideoEnd);
// //       }
// //     };
// //   }, [currentVideo]);
// //   const handleVideoEnd = () => {
// //     setCurrentVideo((prev) => (prev +1) % videos.length);
// //   };

// //   return (
// //     <div className='relative w-full h-screen overflow-hidden flex items-center justify-center z-1'>
// //         <video id="background-video" className="w-auto h-screen min-w-full min-h-full max-w-none object-cover" src={videos[currentVideo]} autoPlay loop={false} muted playsInline/>
// //       </div>
// //   )
// // }

// // export default HeroPage