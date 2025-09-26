import { Chat } from "../models/chat.model.js";
import { Users } from "../models/users.model.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await Chat.find({
      userId: tokenUserId,
    });

    for (const chat of chats) {
      const receiverId = chat.userId.find((id) => id !== tokenUserId);
      const receiver = await Users.findById(receiverId).select("id username avatar");
      chat.receiver = receiver;
    }

    return res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userIDs: tokenUserId,
    }).populate({
      path: "messages",
      options: { sort: { createdAt: 1 } },
    });

    await Chat.updateOne(
      { _id: req.params.id },
      {
        $addToSet: { seenBy: tokenUserId },
      }
    );

    return res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = new Chat({
      userIDs: [tokenUserId, req.body.receiverId],
    });

    await newChat.save();
    return res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findOneAndUpdate(
      {
        _id: req.params.id,
        userIDs: tokenUserId,
      },
      {
        $set: { seenBy: [tokenUserId] },
      },
      { new: true }
    );

    return res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to read chat!" });
  }
};
