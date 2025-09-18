
import { GoogleGenAI, Chat } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAI = () => {
  if (!ai) {
    // FIX: Simplify API key access as per guidelines, assuming it's available in the environment.
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("API_KEY environment variable not set.");
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey });
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
    
    // FIX: The `sendMessage` method returns a `GenerateContentResponse`.
    // The response text is available directly on the `text` property.
    return result.text;
    
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};
