// models/Chat.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    query: { type: String, required: true },
  
    result_text: { type: String },
    
   
    error: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Chat', chatSchema);
