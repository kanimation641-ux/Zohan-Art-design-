
import React, { useState, useRef, useEffect } from 'react';
import { ArchitectureProject } from './types';
import { analyzeArchitecturalImage } from './services/geminiService';
import ProjectCard from './components/ProjectCard';
import DetailModal from './components/DetailModal';
import Sidebar from './components/Sidebar';
import Calculator from './components/Calculator';
import AboutZohan from './components/AboutZohan';
import Login from './components/Login';
import CompanyLogo from './components/CompanyLogo';
import { LayoutGrid, Search, Plus, Upload, X, Loader2, CheckCircle2, User, MapPin, Type, Building2 } from 'lucide-react';

const STORAGE_KEY = 'zohan_shared_vault_v1';
const LOGO_STORAGE_KEY = 'zohan_company_logo';

const INITIAL_FIXTURES: ArchitectureProject[] = [];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [projects, setProjects] = useState<ArchitectureProject[]>([]);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ArchitectureProject | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('vault');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [pendingProject, setPendingProject] = useState<ArchitectureProject | null>(null);
  const [newName, setNewName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY);
    setProjects(savedProjects ? JSON.parse(savedProjects) : INITIAL_FIXTURES);
    
    const savedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (savedLogo) {
      setCompanyLogo(savedLogo);
    }
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setCompanyLogo(base64);
      localStorage.setItem(LOGO_STORAGE_KEY, base64);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const triggerLogoUpload = () => {
    logoInputRef.current?.click();
  };

  const handleLogin = (name: string) => {
    setCurrentUser(name);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('vault');
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsGenerating(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        const project = await analyzeArchitecturalImage(base64, file.type);
        setPendingProject(project);
        setNewName(''); setNewOwner(''); setNewLocation('');
      };
      reader.readAsDataURL(file);
    } catch (err) { 
      console.error(err); 
    } finally {
      setIsGenerating(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const saveProject = () => {
    if (!pendingProject || !newName || !newOwner || !newLocation) return;
    const project = { ...pendingProject, name: newName, owner: newOwner, location: newLocation };
    const updated = [project, ...projects];
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPendingProject(null);
  };

  if (!currentUser) return (
    <>
      <Login 
        onLogin={handleLogin} 
        companyLogo={companyLogo} 
        onLogoUpload={triggerLogoUpload} 
      />
      <input 
        type="file" 
        ref={logoInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleLogoUpload} 
      />
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'calc':
        return <Calculator />;
      case 'about':
        return <AboutZohan />;
      default:
        return (
          <div>
            <div className="flex justify-between items-end mb-16">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Project Portfolio</h1>
                <p className="text-sm text-gray-400">Management & Analysis Workspace</p>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-red-500 text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-200 flex items-center gap-3"
              >
                <Plus size={24} /> New Project
              </button>
            </div>

            {projects.length === 0 && !isGenerating ? (
              <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-red-50 rounded-2xl bg-red-50/10">
                <div className="p-8 bg-red-50 rounded-full mb-6 text-red-400">
                  <LayoutGrid size={64} />
                </div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">No Projects Registered</h2>
                <p className="text-xs text-gray-400 mb-8">Import your first blueprint to begin analysis.</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600"
                >
                  Upload Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isGenerating && (
                  <div className="aspect-[3/4] rounded-lg border border-red-100 flex flex-col items-center justify-center bg-red-50/30 animate-pulse">
                    <Loader2 className="animate-spin text-red-500 mb-4" size={44} />
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Analyzing Project</span>
                  </div>
                )}
                {projects.map(p => <ProjectCard key={p.id} project={p} onSelect={setSelectedProject} />)}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-gray-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        companyLogo={companyLogo} 
        onLogoUpload={triggerLogoUpload}
        onLogout={handleLogout}
      />
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />

      <main className="flex-grow p-8 md:p-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {pendingProject && (
        <div className="fixed inset-0 z-[200] bg-red-900/5 flex items-center justify-center p-6 transition-none">
          <div className="bg-white w-full max-w-4xl rounded-xl flex overflow-hidden shadow-2xl border border-red-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="w-1/2 bg-gray-100 flex items-center justify-center">
              <img src={pendingProject.imageUrl} className="w-full h-full object-cover" alt="Draft" />
            </div>
            <div className="w-1/2 p-12">
              <h3 className="text-xl font-bold mb-8 text-gray-900">Register New Project</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase mb-2 block">Project Title</label>
                  <input value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-white border-b border-gray-100 py-2 focus:outline-none focus:border-red-500 transition-all text-sm text-gray-900 placeholder-gray-300" placeholder="Enter name" autoFocus />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase mb-2 block">Company Owner</label>
                  <input value={newOwner} onChange={e => setNewOwner(e.target.value)} className="w-full bg-white border-b border-gray-100 py-2 focus:outline-none focus:border-red-500 transition-all text-sm text-gray-900 placeholder-gray-300" placeholder="Owner" />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase mb-2 block">Location</label>
                  <input value={newLocation} onChange={e => setNewLocation(e.target.value)} className="w-full bg-white border-b border-gray-100 py-2 focus:outline-none focus:border-red-500 transition-all text-sm text-gray-900 placeholder-gray-300" placeholder="City, Country" />
                </div>
                <div className="flex gap-4 pt-10">
                  <button onClick={() => setPendingProject(null)} className="flex-1 py-4 border border-gray-200 rounded text-[10px] font-bold uppercase hover:bg-gray-50 bg-white">Cancel</button>
                  <button onClick={saveProject} disabled={!newName || !newOwner || !newLocation} className="flex-1 py-4 bg-red-500 text-white rounded text-[10px] font-bold uppercase hover:bg-red-600 disabled:opacity-30 flex items-center justify-center gap-3 shadow-lg shadow-red-100">
                    <CheckCircle2 size={24} /> Finished
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <DetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default App;
