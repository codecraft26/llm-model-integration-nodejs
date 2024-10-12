// controllers/ChatController.js
import Chat from '../models/ChatModel.js';
import SavedChat from '../models/savedChatModel.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config({
    path: './.env',
  });

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use environment variable for API key

export const sendPrompt = async (req, res) => {
  const { userId, query } = req.body;
  console.log("User query:", query);
  console.log("User ID:", userId);

  try {
    // Use the Gemini AI client to generate content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(query);

    // Check if response contains the expected text property
    if (response && response.response && typeof response.response.text === 'function') {
      const result = response.response.text(); // Call the function to get text content
    
// Extract the first five characters for the summary
const summary = result.slice(0, 30);

      // Save the response in the database
      const chat = new Chat({
        summary : summary,
      
        query,
        result_text: result,
      });
      await chat.save();

      // Send the response back to the client
      res.json({ query, summary,result });
    } else {
      // Log and send error response if text property is missing
      console.error("Unexpected response structure:", response);
      res.status(500).json({ error: "Unexpected response structure from Gemini AI API" });
    }
  } catch (error) {
    console.error("Error with Gemini AI API:", error.message || error);
    res.status(500).json({ error: "Failed to process the request" });
  }
};


export const saveChat = async (req, res) => {
    const { userId, query, result_text, summary } = req.body;
  
    try {
      const savedChat = new SavedChat({
        userId,
        query,
        result_text,
        summary,
      });
  
      await savedChat.save();
  
      res.status(201).json({ message: 'Chat saved successfully', savedChat });
    } catch (error) {
      console.error("Error saving chat:", error);
      res.status(500).json({ error: "Failed to save chat" });
    }
  };



