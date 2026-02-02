
import { GoogleGenAI, Type } from "@google/genai";
import { ArchitectureProject } from "../types";

const API_KEY = process.env.API_KEY || "";

const ARCHITECTURE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    style: { type: Type.STRING },
    year: { type: Type.NUMBER },
    location: { type: Type.STRING },
    material: { type: Type.STRING },
    description: { type: Type.STRING },
    specs: {
      type: Type.OBJECT,
      properties: {
        durability: { type: Type.NUMBER },
        sustainability: { type: Type.NUMBER },
        aestheticValue: { type: Type.NUMBER },
        innovation: { type: Type.NUMBER },
      },
      required: ["durability", "sustainability", "aestheticValue", "innovation"]
    }
  },
  required: ["name", "style", "year", "location", "material", "description", "specs"]
};

export const generateArchitecturalConcept = async (prompt: string): Promise<ArchitectureProject> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a futuristic architectural project based on: ${prompt}. Return the data in valid JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: ARCHITECTURE_SCHEMA
    }
  });

  const data = JSON.parse(response.text || "{}");
  return {
    ...data,
    owner: "Manual Entry Required",
    id: Math.random().toString(36).substr(2, 9),
  };
};

export const analyzeArchitecturalImage = async (base64Data: string, mimeType: string): Promise<ArchitectureProject> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: "Analyze this architectural image. Generate a realistic technical profile. DO NOT use words like 'Core' or 'Operational' or 'Station' in the location. Provide an architectural style, estimated year, primary materials, and description. Score engineering metrics 0-100.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: ARCHITECTURE_SCHEMA
    }
  });

  const data = JSON.parse(response.text || "{}");
  return {
    ...data,
    owner: "",
    id: Math.random().toString(36).substr(2, 9),
    imageUrl: `data:${mimeType};base64,${base64Data}`
  };
};
