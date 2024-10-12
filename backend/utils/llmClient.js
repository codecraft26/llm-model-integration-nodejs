  // utils/geminiClient.js
  import { GoogleGenerativeAI } from "@google/generative-ai";
  import dotenv from 'dotenv';
  
  dotenv.config({
      path: './.env'
  }); // Load environment variables
  
  // Initialize the Gemini AI client
  const geminiAI = new GoogleGenerativeAI({
    apiKey: 'AIzaSyDGEE9gaBWTwKCiNQdvCHajFFYYTv78XoE', // Ensure this is set in your .env file
  });
  
  export default geminiAI;
  