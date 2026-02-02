
import React, { useState } from 'react';
import { User, ChevronRight } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

interface LoginProps {
  onLogin: (userName: string) => void;
  companyLogo: string | null;
  onLogoUpload: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, companyLogo, onLogoUpload }) => {
  const team = ["Fitsum Girma", "Enkuberhan Daniel", "Esayas Abebe", "Mikiyas Kefyalew"];
  const [loading, setLoading] = useState<string | null>(null);

  const handle = (name: string) => {
    setLoading(name);
    setTimeout(() => onLogin(name), 1000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white flex items-center justify-center p-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-12">
          <div className="inline-block p-1 rounded-xl mb-6">
            <CompanyLogo 
              src={companyLogo} 
              size={80} 
              className="grayscale-[0.3] hover:grayscale-0 shadow-sm border border-red-100" 
              onClick={onLogoUpload}
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 mb-2">Zohan Design</h1>
          <p className="text-xs text-red-500 uppercase tracking-widest font-medium">Please Identify Yourself</p>
        </div>

        <div className="space-y-3">
          {team.map(name => (
            <button
              key={name}
              onClick={() => handle(name)}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-red-50 bg-white hover:bg-red-50 hover:border-red-200 transition-all group"
            >
              <span className="text-xs font-semibold text-gray-600 group-hover:text-red-500 uppercase tracking-wider">
                {loading === name ? 'Authenticating...' : name}
              </span>
              <ChevronRight size={24} className="text-red-300 group-hover:text-red-500" />
            </button>
          ))}
        </div>
        
        <p className="mt-12 text-center text-[9px] text-red-300 uppercase tracking-[0.3em] font-medium">Secure Access v4.0</p>
      </div>
    </div>
  );
};

export default Login;
