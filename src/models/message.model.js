import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  ip: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Message", messageSchema);
