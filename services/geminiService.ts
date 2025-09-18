
import { GoogleGenAI, Chat } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const startChat = (): Chat => {
  if (!chat) {
    const aiInstance = getAI();
    chat = aiInstance.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
      },
    });
  }
  return chat;
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    const chatSession = startChat();
    const result = await chatSession.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};
