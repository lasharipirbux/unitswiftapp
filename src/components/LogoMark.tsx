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
      <rect width="80" height="80" rx="18" fill="#1F2A44" />
      {/* Top arrow pointing right */}
      <path
        d="M20 29H58M49 20L60 29L49 38"
        stroke="#F2C94C"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom arrow pointing left */}
      <path
        d="M60 51H22M31 42L20 51L31 60"
        stroke="#F2C94C"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
