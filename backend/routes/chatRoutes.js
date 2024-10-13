// routes/chatRoutes.js
import express from 'express';
import { sendPrompt,saveChat } from '../controller/chatController.js';
import { registerUser,loginUser} from '../controller/userController.js';
import {isAuthenticatedUser} from '../middleware/auth.js'

const router = express.Router();



// Define the route and attach the controller function
router.post('/send-prompt', isAuthenticatedUser,sendPrompt);
router.post('/save-chat', saveChat); 
router.post('/register', registerUser);
router.post('/login',loginUser)

export default router;
