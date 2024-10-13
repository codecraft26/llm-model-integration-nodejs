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
  const { query } = req.body;
  const userId = req.user._id; // Get userId from authenticated user data
  
  console.log("User query:", query);
  console.log("User ID from token:", userId);

  try {
    // Use the Gemini AI client to generate content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(query);

    // Extract the response text if available
    if (response && response.response && typeof response.response.text === 'function') {
      const result = response.response.text();
      const summary = result.slice(0, 30); // Create summary

      // Save the chat entry in the database with userId
      const chat = new Chat({
        userId,
        query,
        result_text: result,
      });
      await chat.save();

      // Send the result and summary to the client
      res.json({ query, summary, result });
    } else {
      console.error("Unexpected response structure:", response);
      res.status(500).json({ error: "Unexpected response structure from Gemini AI API" });
    }
  } catch (error) {
    console.error("Error with Gemini AI API:", error.message || error);

    // Save error information in the database along with userId
    const chat = new Chat({
      userId,
      query,
      error: error.message || "Failed to process the request",
    });
    await chat.save();

    res.status(500).json({ error: "Failed to process the request" });
  }
};

export const saveChat = async (req, res) => {
  const { chatId } = req.body; // Get chatId from query params
  const userId = req.user._id; // Get userId from authenticated user data

  try {
    // Fetch the existing chat document using the chatId
    const chat = await Chat.findById(chatId);

    // Check if the chat document exists
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Save the chat data to SavedChat
    const savedChat = new SavedChat({
      userId,
      query: chat.query,
      result_text: chat.result_text,
      summary: chat.result_text.slice(0, 30), // Generate summary if not already provided
    });

    await savedChat.save();

    res.status(201).json({ message: 'Chat saved successfully', savedChat });
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ error: "Failed to save chat" });
  }
};

export const getChatHistory = async (req, res) => {
  const userId = req.user._id; // Get userId from authenticated user data

  try {
    // Fetch all chats associated with the current user
    const chats = await Chat.find({ userId }).sort({ createdAt: -1 }); // Sort by creation date, newest first

    // Check if there are any chats
    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: 'No chat history found for this user' });
    }

    // Send the chat history to the client
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};


export const getSavedChatHistory = async (req, res) => {
  const userId = req.user._id; // Get userId from authenticated user data

  try {
    // Fetch all saved chats associated with the current user
    const savedChats = await SavedChat.find({ userId }).sort({ createdAt: -1 }); // Sort by creation date, newest first

    // Check if there are any saved chats
    if (!savedChats || savedChats.length === 0) {
      return res.status(404).json({ message: 'No saved chat history found for this user' });
    }

    // Send the saved chat history to the client
    res.status(200).json({ success: true, savedChats });
  } catch (error) {
    console.error("Error fetching saved chat history:", error);
    res.status(500).json({ error: "Failed to fetch saved chat history" });
  }
};




