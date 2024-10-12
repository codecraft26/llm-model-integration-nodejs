// routes/chatRoutes.js
import express from 'express';
import { sendPrompt,saveChat } from '../controller/chatController.js';

const router = express.Router();

// Define the route and attach the controller function
router.post('/send-prompt', sendPrompt);
router.post('/save-chat', saveChat); 

export default router;
