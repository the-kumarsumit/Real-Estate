import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: { type: String },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);