
export interface ArchitectureProject {
  id: string;
  name: string;
  owner: string;
  style: string;
  year: number;
  location: string;
  material: string;
  description: string;
  imageUrl?: string;
  specs: {
    durability: number;
    sustainability: number;
    aestheticValue: number;
    innovation: number;
  };
}

export interface GenerationConfig {
  theme: string;
  scale: 'micro' | 'urban' | 'planetary';
  priority: 'efficiency' | 'aesthetic' | 'living-organism';
}
