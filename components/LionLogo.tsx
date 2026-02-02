
import React from 'react';

const LionLogo: React.FC<{ className?: string; size?: number }> = ({ className, size = 32 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Stylized Lion Face Line Art */}
    <path 
      d="M50 20C45 22 40 28 35 35M50 20C55 22 60 28 65 35" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
    <path 
      d="M30 50C25 55 20 65 25 75C28 85 35 90 50 100C65 90 72 85 75 75C80 65 75 55 70 50" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M40 65C40 65 45 60 50 60C55 60 60 65 60 65M42 75C42 75 45 72 50 72C55 72 58 75 58 75" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
    <path 
      d="M45 85L42 95L50 90L58 95L55 85" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M32 40L28 35M68 40L72 35" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export default LionLogo;
