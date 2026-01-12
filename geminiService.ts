
import { GoogleGenAI } from "@google/genai";

// Fix: Refactor askGIM to create a new instance per call for better key management and include thinkingConfig
export const askGIM = async (prompt: string, lang: string): Promise<string> => {
  // Always initialize with named parameter and direct process.env.API_KEY access
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert technical support assistant for Electro GIM Services in Morocco. 
        Your name is GIM AI. You specialize in Smart Home systems, Networking, CCTV, and Web Development.
        The user is speaking in ${lang}. Respond in the same language and tone (use Moroccan Darija if the language is 'ma').
        Be professional, helpful, and encourage the user to contact the company at +212 770501853 if they need professional installation.`,
        temperature: 0.7,
        // Gemini 3 models support thinkingConfig for enhanced reasoning capabilities
        thinkingConfig: { thinkingBudget: 24576 }
      },
    });

    // Access the .text property directly (not as a method) as per SDK guidelines
    return response.text || "I'm sorry, I couldn't process that. Please try again or contact our support.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI service is currently unavailable. Please call +212 770501853 for assistance.";
  }
};
