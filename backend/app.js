import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit'; // Import the rate limiter
import cors from 'cors';


// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  import('dotenv').then((dotenv) => dotenv.config({ path: '../.env' }));
}

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
import chatRoutes  from './routes/chatRoutes.js';

// other middleware and routes
app.use('/api/chats', chatRoutes);


export default app;