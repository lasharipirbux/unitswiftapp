import React from 'react';

interface LogoMarkProps {
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ className = 'w-20 h-20' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Dark navy rounded square */}
      <rect width="80" height="80" rx="18" fill="#1F2A44" />

      {/* Tiny yellow ruler-tick notch at the top-left corner of the square */}
      <rect x="17" y="0" width="5.5" height="11" rx="2.75" fill="#F2C94C" />

      {/* Top swap arrow pointing right (thicker with rounded ends) */}
      <path
        d="M20 30H58M48 20L59 30L48 40"
        stroke="#F2C94C"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom swap arrow pointing left (thicker with rounded ends) */}
      <path
        d="M60 52H22M32 42L21 52L32 62"
        stroke="#F2C94C"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
