import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  try {
    const chat = await Chat.findOne({
      _id: chatId,
      userIDs: tokenUserId, 
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    const message = new Message({
      text,
      chatId,
      userId: tokenUserId,
    });

    await message.save();

    await Chat.findByIdAndUpdate(
      chatId,
      {
        $set: {
          lastMessage: text,
        },
        $addToSet: {
          seenBy: tokenUserId,  
        },
      },
      { new: true }  
    );

    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to add message!" });
  }
};
