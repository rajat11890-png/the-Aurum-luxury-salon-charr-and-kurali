import React from 'react';

interface AurumLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge' | 'horizontal' | 'light';
  showSubtitle?: boolean;
}

export const AurumLogo: React.FC<AurumLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'badge',
  showSubtitle = true
}) => {
  // Dimensions for circular badge
  const sizeMap = {
    sm: { badge: 40, icon: 24, text: 'text-sm' },
    md: { badge: 52, icon: 32, text: 'text-base' },
    lg: { badge: 72, icon: 44, text: 'text-lg' },
    xl: { badge: 120, icon: 72, text: 'text-2xl' }
  };

  const currentSize = sizeMap[size];

  // Official Brand Logo Emblem
  const BadgeIcon = () => (
    <div className="relative w-full h-full select-none">
      <img
        src="/aurum_official_logo.png"
        alt="The Aurum Luxury Unisex Salon Official Logo"
        className="w-full h-full object-contain rounded-full drop-shadow-md pointer-events-none"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback to SVG asset if image load fails
          const target = e.currentTarget;
          target.src = '/aurum_official_logo.svg';
        }}
      />
    </div>
  );

  if (variant === 'badge') {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: currentSize.badge, height: currentSize.badge }}
      >
        <BadgeIcon />
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3.5 ${className}`}>
        <div
          className="relative inline-flex items-center justify-center shrink-0"
          style={{ width: currentSize.badge, height: currentSize.badge }}
        >
          <BadgeIcon />
        </div>
        <div className="flex flex-col">
          <span className="font-serif-luxury font-bold text-xl md:text-2xl tracking-[0.08em] text-[#0B3B95] leading-none">
            THE AURUM
          </span>
          {showSubtitle && (
            <span className="text-[10px] md:text-[11px] font-sans-clean font-semibold tracking-[0.25em] text-[#C59B27] uppercase mt-1">
              Luxury Unisex Salon
            </span>
          )}
        </div>
      </div>
    );
  }

  // Light variant for dark navy / footer sections
  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      <div
        className="relative inline-flex items-center justify-center shrink-0 ring-2 ring-[#C59B27]/40 rounded-full"
        style={{ width: currentSize.badge, height: currentSize.badge }}
      >
        <BadgeIcon />
      </div>
      <div className="flex flex-col">
        <span className="font-serif-luxury font-bold text-2xl tracking-[0.1em] text-white leading-none">
          THE AURUM
        </span>
        {showSubtitle && (
          <span className="text-[11px] font-sans-clean font-semibold tracking-[0.22em] text-[#E5C568] uppercase mt-1">
            Luxury Unisex Salon · His & Her
          </span>
        )}
      </div>
    </div>
  );
};
