import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

async function generateContent() {
  try {
    // Initialize the AI client with API key from environment variables
    const genAI = new GoogleGenerativeAI('AIzaSyDGEE9gaBWTwKCiNQdvCHajFFYYTv78XoE');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Define the prompt and generate content
    const prompt = "Write an essay on a cow in 50 words";
    const result = await model.generateContent(prompt);

    // Check if the response contains text
    if (result && result.response) {
      console.log(result.response.text());
    } else {
      console.error("No response text available.");
    }

  } catch (error) {
    // Handle any errors that occurred during the API call
    console.error("Error generating content:", error);
  }
}

generateContent();
