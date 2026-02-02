
import React from 'react';

const LionIdentity: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 200 }) => (
  <div 
    style={{ width: size, height: (size * 1.33) }}
    className={`bg-[#ef4444] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl ${className}`}
  >
    {/* Minimalist Lion Head Line Art */}
    <svg 
      width={size * 0.7} 
      height={size * 0.7} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-white opacity-95 drop-shadow-xl"
    >
      <path 
        d="M40 30C45 25 55 25 60 30M35 45C30 48 30 55 35 60C38 65 45 65 50 65M50 65C55 65 62 65 65 60C70 55 70 48 65 45M50 65V80M45 70L50 80L55 70M25 40L32 45M75 40L68 45M45 20C45 20 48 15 50 15C52 15 55 20 55 20" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M48 38H52M45 42H55" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
    </svg>
    {/* Texture overlay to match the grain in the image */}
    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
  </div>
);

export default LionIdentity;