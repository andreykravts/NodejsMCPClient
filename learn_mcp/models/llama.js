// models/llama.js

import axios from "axios";
import 'dotenv/config';

/**
 * Queries a local LLaMA model via Ollama API.
 * @param {string} prompt - The prompt to send to the LLaMA model.
 * @returns {Promise<string>} - A promise that resolves to the LLaMA model's response.
 */
async function queryLLaMA(prompt) {
    const model = process.env.LLAMA_MODEL_NAME || "llama3";

    try {
        const response = await axios.post(
            "http://localhost:11434/api/generate",
            {
                model: model,
                prompt: prompt,
                stream: false,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.response;
    } catch (error) {
        console.error("Error querying LLaMA:", error.message);
        if (error.response) {
            console.error("LLaMA API response error data:", error.response.data);
            console.error("LLaMA API response status:", error.response.status);
        }
        throw new Error("Failed to get response from LLaMA model.");
    }
}

export { queryLLaMA };