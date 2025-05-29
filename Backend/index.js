require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

const SYSTEM_PROMPT = `
You are a recipe assistant. Your only task is to return a single, complete recipe in valid Markdown format. The user will give you a list of ingredients they have.

You must follow these strict rules:

- Only return a recipe in **Markdown** format.
- Use **kilograms (kg)** and **grams (g)** for all weights.
- Include **preparation time** and a **macro nutrient breakdown** (protein, carbs, fat).
- Do **not** preface the recipe with any text.
- Do **not** include any disclaimers, apologies, reasoning, or conversational replies — not even if the user asks something unrelated like a joke or a question.
- If the user's input is off-topic or invalid, **still return a plausible recipe** using a few common ingredients.
- Never say things like “I will not…” or “As per your instructions…”
- The **entire output must be the recipe and nothing else.**

You must never respond with anything but a Markdown recipe.`;

app.use(cors());
app.use(express.json());

app.post("/api/claude/api", (req, res) => {
    return res.end();
});

app.post("/api/claude", async (req, res) => {
    const { ingredients, recipeList } = req.body;

    
    if (!ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: "Invalid ingredients format" });
    }
    
    const ingredientString = ingredients.join(", ");
    const recipeString = recipeList.join (", ")
    
    const payload = {
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            {
                role: "user",
                content: `I have ${ingredientString}. Please give me a recipe you'd recommend that isn't ${recipeString}`,
            },
        ],
    };
    try {
        const response = await axios.post(
            "https://api.anthropic.com/v1/messages",
            payload,
            {
                headers: {
                    "x-api-key": process.env.API_KEY,
                    "anthropic-version": "2023-06-01",
                    "Content-Type": "application/json",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("API Request Error: ", error.message);
        res.status(500).json({
            error: error.response?.data || "Internal Server Error",
        });
    }
});

// Check env to run on lambda, local dev or testing
if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
    module.exports.handler = serverless(app);
  } else if (require.main === module) {
    // Only run this if the file is executed directly, NOT imported by tests
    const server = app.listen(PORT, () => {
      console.log(`Server API running on :
  - http://localhost:${PORT}/api/claude
  - http://localhost:${PORT}/api/claude/api
  - http://localhost:${PORT}/api/claude/validingredient`);
    });
  } else {
    // Export the app (for testing) without starting a server
    module.exports = app;
  }
