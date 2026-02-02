
import React from 'react';
import { LayoutGrid, Calculator as CalcIcon, User, Settings, LogOut, Sparkles } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: string;
  companyLogo: string | null;
  onLogoUpload: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, currentUser, companyLogo, onLogoUpload, onLogout }) => {
  return (
    <aside className="w-64 bg-white border-r border-red-50 h-screen sticky top-0 flex flex-col z-50">
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3">
          <CompanyLogo 
            src={companyLogo} 
            size={36} 
            onClick={onLogoUpload}
            className="rounded border border-red-50"
          />
          <span className="font-bold text-sm tracking-tight text-gray-900 uppercase">Zohan Design</span>
        </div>
      </div>

      <nav className="flex-grow px-4 space-y-1">
        <button
          onClick={() => setActiveTab('vault')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'vault' 
              ? 'bg-red-50 text-red-500 shadow-sm shadow-red-100/50' 
              : 'text-gray-500 hover:text-red-500 hover:bg-red-50/50'
          }`}
        >
          <LayoutGrid size={28} />
          Projects
        </button>
        <button
          onClick={() => setActiveTab('calc')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'calc' 
              ? 'bg-red-50 text-red-500 shadow-sm shadow-red-100/50' 
              : 'text-gray-500 hover:text-red-500 hover:bg-red-50/50'
          }`}
        >
          <CalcIcon size={28} />
          Estimator
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'about' 
              ? 'bg-red-50 text-red-500 shadow-sm shadow-red-100/50' 
              : 'text-gray-500 hover:text-red-500 hover:bg-red-50/50'
          }`}
        >
          <Sparkles size={28} />
          More about Zohan
        </button>
      </nav>

      <div className="p-4 border-t border-red-50">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50/50 mb-4">
          <div className="w-12 h-12 rounded-full bg-white border border-red-100 flex items-center justify-center text-red-500 shadow-sm">
            <User size={24} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] text-red-400 font-bold uppercase truncate">{currentUser}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-xs text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
            <Settings size={22} />
            Settings
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 group"
          >
            <LogOut size={22} className="group-hover:text-red-500" />
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
