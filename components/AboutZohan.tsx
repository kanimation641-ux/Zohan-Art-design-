
import React from 'react';
import { Sparkles, Package } from 'lucide-react';

const AboutZohan: React.FC = () => {
  const products = [
    "3d Renderings and presentation",
    "Business card design",
    "3d max modeling",
    "Auto cad and Revit drawings",
    "Year book design",
    "Logo design",
    "Book cover design",
    "Photo editing",
    "Invitation card",
    "Magazine and booklet design",
    "Banner",
    "Poster",
    "Flyer",
    "Brochure",
    "Sketch book design",
    "Furniture design",
    "Interior design"
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-red-50 rounded-xl">
          <Sparkles size={40} className="text-red-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">The Zohan Identity</h2>
          <p className="text-xs text-red-500 uppercase tracking-widest font-medium">Design Studio Philosophy</p>
        </div>
      </div>

      <div className="bg-white border border-red-100 rounded-3xl p-12 shadow-sm mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
        <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-medium max-w-2xl tracking-tight relative z-10">
          "Zohan is a design team, whose main intention is finding a <span className="text-red-500 font-bold">new approach</span> in the design industry. 
          The team primarily focuses on architectural design, general graphics design and furniture designs."
        </p>
      </div>

      <div className="space-y-8">
        <h3 className="flex items-center gap-3 text-[11px] font-bold text-red-500 mb-8 uppercase tracking-widest border-b border-red-50 pb-4">
          <Package size={24} /> Our Craft & Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
          {products.map((product, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors group border border-transparent hover:border-red-100"
            >
              <div className="w-2 h-2 rounded-full bg-red-300 group-hover:bg-red-500 transition-colors"></div>
              <span className="text-sm text-gray-600 group-hover:text-red-500 font-medium">{product}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutZohan;
