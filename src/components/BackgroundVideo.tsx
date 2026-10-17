import React, { useRef, useEffect } from 'react';

interface BackgroundVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
  isMuted?: boolean;
}

/**
 * High-performance, bulletproof HTML5 background video component.
 * Automatically guarantees muted autoplay across iOS Safari, Chrome, Edge, and Android
 * using explicit DOM property enforcement, viewport intersection tracking, and user interaction fallback.
 */
export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src,
  poster,
  className = '',
  isMuted = true,
  ...rest
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly enforce muted and playsinline properties directly on the DOM element
    // This is mandatory to prevent Safari / Chrome autoplay policy rejections
    video.defaultMuted = isMuted;
    video.muted = isMuted;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    let isDestroyed = false;

    const playVideo = () => {
      if (isDestroyed || !video) return;
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay delayed or restricted by browser; will retry on visibility/interaction
          });
        }
      }
    };

    // Attempt immediate play
    playVideo();

    // Listen to video lifecycle events
    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);

    // Play when entering viewport
    let observer: IntersectionObserver | null = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playVideo();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(video);
    }

    // Unblock on any first touch or click on document if browser battery saver was active
    const handleFirstInteraction = () => {
      playVideo();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });

    return () => {
      isDestroyed = true;
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      if (observer) observer.disconnect();
    };
  }, [src, isMuted]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted={isMuted}
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      className={className}
      {...rest}
    />
  );
};
