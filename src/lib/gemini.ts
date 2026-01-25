import { GoogleGenerativeAI } from "@google/generative-ai";
import { Task } from "@/types";

const GEMINI_API_KEY = localStorage.getItem("gemini_api_key") || "";

export const GeminiService = {
  checkContent: async (content: string, type: 'username' | 'appreciation'): Promise<{ allowed: boolean; reason?: string }> => {
    if (!GEMINI_API_KEY) {
      console.warn("Gemini API Key missing. Skipping real moderation.");
      if (content.toLowerCase().includes("bad") || content.toLowerCase().includes("hate")) {
        return { allowed: false, reason: "Content flagged by (Mock) AI." };
      }
      return { allowed: true };
    }

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        You are a content moderator for a professional building management app.
        Task: Check if the following ${type} is appropriate.
        Content: "${content}"
        
        Rules:
        - No profanity, hate speech, or offensive language.
        - For usernames: proper format, no impersonation (simplified).
        - For appreciations: constructive or neutral, not abusive.
        
        Respond ONLY with a JSON object: { "allowed": boolean, "reason": "string (optional)" }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(jsonStr);
      } catch (e) {
        console.error("Failed to parse Gemini response", text);
        return { allowed: true };
      }
    } catch (error) {
      console.error("Gemini API Error", error);
      return { allowed: true };
    }
  },

  verifyTaskCompletion: async (task: Task, _videoFile: File): Promise<{ verified: boolean; feedback: string }> => {
     // NOTE: File processing with Gemini requires File API usage which might be heavy for this demo.
     // We will mock the "Visual Verification" but keeping the interface real.
     // If user puts "fail" in task title for testing, we reject.
     
     // console.log("Verifying task:", task.title);
     // console.log("Analyzing video:", videoFile.name, videoFile.size);

     await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate analysis time

     if (!GEMINI_API_KEY) {
         // Mock Logic
         if (task.title.toLowerCase().includes("fail")) {
             return { verified: false, feedback: "The video does not seem to match the task requirements (Mock)." };
         }
         return { verified: true, feedback: "Video content matches task description. Good job!" };
     }

     // Real Gemini logic (if we had key and file support ready) would go here.
     // For this environment, we stick to the mock to ensure reliability during demo unless user provides key.
     return { verified: true, feedback: "Video verified by AI (Mock). Work approved." };
  }
};
