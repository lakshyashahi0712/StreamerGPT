import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from "./constants.jsx"; // your existing constant

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}
