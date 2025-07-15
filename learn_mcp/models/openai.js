// models/openai.js

import { OpenAI } from "openai";
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function queryOpenAI(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4", // or "gpt-3.5-turbo"
            messages: [{ role: "user", content: prompt }],
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error querying OpenAI:", error);
        throw error;
    }
}

export { queryOpenAI };
