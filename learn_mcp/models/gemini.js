
// models/gemini.js

import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function queryGemini(prompt) {
    try {
        const result = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        return result.text;
    } catch (error) {
        console.error("Error querying Gemini:", error);
        throw error;
    }
}

export { queryGemini };
