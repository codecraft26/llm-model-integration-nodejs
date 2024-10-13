// routes/chatRoutes.js
import express from 'express';
import { sendPrompt,saveChat,getChatHistory ,getSavedChatHistory} from '../controller/chatController.js';
import { registerUser,loginUser,logout} from '../controller/userController.js';
import {isAuthenticatedUser,authorizeRoles} from '../middleware/auth.js'

const router = express.Router();




router.post('/send-prompt', isAuthenticatedUser,sendPrompt);

router.post('/save-chat',isAuthenticatedUser, saveChat); 
router.post('/register', registerUser);
router.post('/login',loginUser)
router.get('/logout',logout)

router.get('/admin/history',isAuthenticatedUser,authorizeRoles('admin'),getChatHistory)
router.get('/savedChat',isAuthenticatedUser,getSavedChatHistory)

export default router;
