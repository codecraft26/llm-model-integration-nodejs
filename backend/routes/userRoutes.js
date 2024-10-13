// routes/chatRoutes.js
import express from 'express';

import { registerUser } from '../controller/userController.js';
const router = express.Router();

// Define the route and attach the controller function
router.post('/register', registerUser);


export default router;
