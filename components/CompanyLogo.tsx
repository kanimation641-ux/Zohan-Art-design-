
import React from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';

interface CompanyLogoProps {
  src?: string | null;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ src, size = 40, className = "", onClick }) => {
  const containerClass = `relative group flex items-center justify-center rounded-lg overflow-hidden transition-all bg-white ${
    onClick ? 'cursor-pointer hover:ring-2 hover:ring-gray-900 hover:ring-offset-2' : ''
  } ${className}`;

  const renderContent = () => {
    if (src) {
      return (
        <img 
          src={src} 
          alt="Company Logo" 
          style={{ width: size, height: size }}
          className="object-cover"
        />
      );
    }
    return (
      <div 
        style={{ width: size, height: size }}
        className="flex items-center justify-center bg-gray-50 text-gray-300 border border-dashed border-gray-200 w-full h-full"
      >
        <ImageIcon size={size * 0.4} />
      </div>
    );
  };

  return (
    <div className={containerClass} onClick={onClick} title={onClick ? "Click to upload photo" : ""}>
      {renderContent()}
      {onClick && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
          <Upload size={size * 0.3} className="text-white mb-1" />
          <span className="text-[8px] text-white font-bold uppercase tracking-tighter">Upload</span>
        </div>
      )}
    </div>
  );
};

export default CompanyLogo;
