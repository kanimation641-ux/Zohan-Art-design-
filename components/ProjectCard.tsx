
import React from 'react';
import { ArchitectureProject } from '../types';
import { MapPin, User, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: ArchitectureProject;
  onSelect: (project: ArchitectureProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div 
      className="modern-card rounded-lg overflow-hidden cursor-pointer group flex flex-col h-full shadow-sm hover:border-red-300"
      onClick={() => onSelect(project)}
    >
      <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.name} 
            className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest bg-gray-50">
            Processing...
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-red-500 uppercase tracking-tighter border border-red-50">
          {project.style}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-red-500 transition-colors">
          {project.name}
        </h3>
        
        <div className="space-y-3 mb-6 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <User size={22} className="text-red-300 group-hover:text-red-500" />
            <span className="font-medium text-gray-700">{project.owner}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={22} className="text-red-300 group-hover:text-red-500" />
            <span>{project.location}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-red-50">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{project.year}</span>
          <ArrowRight size={22} className="text-red-200 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
