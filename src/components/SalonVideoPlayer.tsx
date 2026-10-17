import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Instagram, ExternalLink, Sparkles } from 'lucide-react';
import { AurumLogo } from './AurumLogo';
import salonTourVideo from '../assets/video/aurum_salon_tour.mp4';

interface SalonVideoPlayerProps {
  className?: string;
}

export const SalonVideoPlayer: React.FC<SalonVideoPlayerProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);

  const instagramReelUrl = 'https://www.instagram.com/reel/DLP5MzRS30u/?xtok=amM4bjN3enBvdXZ2';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div
      className={`relative w-full max-w-[340px] sm:max-w-[380px] mx-auto select-none ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Outer decorative gold arched hairline frame matching salon architecture */}
      <div className="absolute -inset-2.5 sm:-inset-3 rounded-t-[110px] sm:rounded-t-[130px] rounded-b-3xl border border-[#C59B27]/30 -z-10 transform -rotate-1 hidden sm:block pointer-events-none" />

      {/* Main Luxury Arched Bezel */}
      <div className="relative rounded-t-[100px] sm:rounded-t-[120px] rounded-b-3xl overflow-hidden shadow-2xl bg-stone-950 border-2 border-[#C59B27]/70 group">
        
        {/* Native HTML5 Video Element */}
        <video
          ref={videoRef}
          src={salonTourVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[480px] sm:h-[540px] object-cover object-center cursor-pointer bg-stone-900"
          onClick={togglePlay}
          aria-label="Aurum Luxury Salon Atmosphere & Tour Video"
        />

        {/* Subtle Vignette Gradient Overlay */}
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none"
        />

        {/* Top Header Tag */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white">
            <Sparkles className="w-3 h-3 text-[#E5C568]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E5C568]">
              Salon Tour
            </span>
          </div>

          {/* Sound Toggle Button (44px touch target) */}
          <button
            onClick={toggleMute}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all shadow-md active:scale-95 cursor-pointer"
            aria-label={isMuted ? 'Unmute video sound' : 'Mute video sound'}
            title={isMuted ? 'Turn Sound On' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-stone-300" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#E5C568]" />
            )}
          </button>
        </div>

        {/* Center Play Indicator when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#0B3B95]/90 hover:bg-[#07255E] backdrop-blur-md border-2 border-[#E5C568] flex items-center justify-center text-white shadow-2xl transition-transform active:scale-95 z-20 cursor-pointer"
            aria-label="Play salon video"
          >
            <Play className="w-7 h-7 fill-white text-white ml-1" />
          </button>
        )}

        {/* Bottom Bar: Progress line + Details & Instagram Action */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white pointer-events-auto">
          
          {/* Champagne gold progress hairline */}
          <div className="w-full h-1 bg-white/20 rounded-full mb-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C59B27] to-[#E5C568] transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="font-serif-luxury text-lg sm:text-xl font-bold text-white tracking-wide leading-tight">
                Aurum Salon Tour
              </div>
              <p className="text-[11px] text-stone-300 font-light mt-0.5">
                Modern Valley, Kharar & Kurali
              </p>
            </div>

            {/* Direct Link to original Instagram Reel */}
            <a
              href={instagramReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[38px] px-3.5 py-1.5 bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md border border-white/25 text-white text-[10px] font-bold uppercase tracking-[0.14em] rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
              title="View on Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E5C568]" />
              <span>Instagram</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
            </a>
          </div>

        </div>

      </div>

      {/* Floating Brand Badge (Bottom Right) */}
      <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-xl border border-stone-200/90 flex items-center gap-2.5 z-20">
        <AurumLogo size="sm" variant="badge" className="w-8 h-8" />
        <div>
          <div className="font-serif-luxury font-bold text-xs sm:text-sm text-[#0B3B95] leading-none">
            THE AURUM
          </div>
          <div className="text-[9px] font-semibold text-[#C59B27] tracking-wider uppercase mt-0.5">
            His & Her Luxury
          </div>
        </div>
      </div>
    </div>
  );
};
