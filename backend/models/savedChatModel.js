// models/SavedChatModel.js
import mongoose from 'mongoose';

const savedChatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  result_text: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedChat = mongoose.model('SavedChat', savedChatSchema);

export default SavedChat;
