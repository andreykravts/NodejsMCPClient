
// server.js

import path from "path";
import { fileURLToPath } from 'url';
import 'dotenv/config';
import express from "express";

import { getEvents } from "./mcp.js";
import { queryOpenAI } from "./models/openai.js";
import { queryGemini } from "./models/gemini.js";
import { queryLLaMA } from "./models/llama.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`[DEBUG] __filename: ${__filename}`);
console.log(`[DEBUG] __dirname: ${__dirname}`);
console.log(`[DEBUG] Full path to public directory: ${path.join(__dirname, "public")}`);

app.use(express.static(path.join(__dirname, "public")));

app.post("/ask/:model", async (req, res) => {
    const { model } = req.params;
    const { question, city } = req.body;

    const events = getEvents(city);
    const contextString = events.length
        ? `Here are the events in ${city}: ` +
        events.map(e => `${e.title} on ${e.date} at ${e.location}`).join(", ")
        : `No events found in ${city}.`;

    const finalPrompt = `Context:\n${contextString}\n\nUser question:\n${question}`;

    try {
        let answer;

        switch (model) {
            case "openai":
                answer = await queryOpenAI(finalPrompt);
                break;
            case "gemini":
                answer = await queryGemini(finalPrompt);
                break;
            case "llama":
                answer = await queryLLaMA(finalPrompt);
                break;
            default:
                return res.status(400).json({ error: "Unsupported model" });
        }

        res.json({ answer });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Model call failed" });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
