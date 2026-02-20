
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string) => {
  // Always initialize inside the function to ensure the latest API_KEY is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the Softonicus Assistant. You are an expert in Windows keys, Office licenses, Antivirus (Kaspersky, Norton), and Games (Steam, Xbox). Keep answers professional and short. Always recommend a product from the Softonicus catalog when helpful.",
      },
    });

    // Directly access .text property as per latest SDK guidelines
    return response.text || "I'm here to help you find the perfect digital key!";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error?.message?.includes("entity was not found")) {
      return "The connection to the AI brain is being reset. Please try again in a moment.";
    }
    return "I am currently performing maintenance on my royal scrolls. How else can I assist you with our products?";
  }
};
