
import React from 'react';
import { ArchitectureProject } from '../types';
import { X, Info, Shield, User, MapPin, Building } from 'lucide-react';

interface DetailModalProps {
  project: ArchitectureProject | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-red-950/20 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-xl flex flex-col md:flex-row relative shadow-2xl border border-red-50">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/95 hover:bg-red-50 text-red-400 hover:text-red-500 transition-all border border-red-50 shadow-sm"
        >
          <X size={28} />
        </button>

        <div className="md:w-1/2 h-64 md:h-auto bg-gray-50">
          <img 
            src={project.imageUrl || `https://picsum.photos/seed/${project.id}/1200/800`} 
            className="w-full h-full object-cover grayscale-[0.2]"
            alt={project.name}
          />
        </div>

        <div className="md:w-1/2 p-10 md:p-14 overflow-y-auto">
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] mb-2">Project Specification</p>
          <h2 className="text-4xl font-bold mb-8 text-gray-900 tracking-tight">{project.name}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="p-4 rounded-lg bg-red-50/30 border border-red-50">
              <p className="text-[9px] text-red-500 uppercase font-bold mb-1">Company</p>
              <p className="text-gray-900 font-semibold text-sm">{project.owner}</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50/30 border border-red-50">
              <p className="text-[9px] text-red-500 uppercase font-bold mb-1">Location</p>
              <p className="text-gray-900 font-semibold text-sm">{project.location}</p>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-3">
                <Info size={24} className="text-red-500" /> Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-y-6">
              {Object.entries(project.specs).map(([key, value]) => (
                <div key={key}>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mb-2 tracking-widest">{key}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-grow h-1 bg-red-50 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 transition-all" style={{ width: `${value}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-red-500">{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-12 w-full py-4 rounded-lg bg-red-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-100">
            <Building size={24} /> Export Technical File
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
