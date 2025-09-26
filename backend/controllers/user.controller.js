import { Users } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { SavedPost } from "../models/savedPost.model.js";
import { Post } from "../models/post.model.js";
import { Chat } from "../models/chat.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    return res.status(200).json({ message: "Sucessfull", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get Users." });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const avatarPath = req.file.path;
    const avatar = await uploadOnCloudinary(avatarPath, "avatars");
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar: avatar.secure_url }),
      },
      { new: true }
    );

    const { password: userPassword, ...userInfo } = updatedUser;

    res.status(200).json({ message: "updated Successfully", userInfo });
  } catch (err) {
    res.status(500).json({ message: "Failed to update users!" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

export const savePost = async (req, res) => {
  
  const postId = req.body.postId;
  const tokenUserId = req.userId;
  console.log(postId,tokenUserId);
  
  

  try {
    const savedPost = await SavedPost.findOne({
      userId: tokenUserId,
      postId: postId,
    });

    if (savedPost) {
      await SavedPost.deleteOne({ _id: savedPost._id });
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      await SavedPost.create({
        userId: tokenUserId,
        postId: postId,
      });
      res.status(200).json({ message: "Post saved" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await Post.find({ userId: tokenUserId });
    const saved = await SavedPost.find({ userId: tokenUserId }).populate({
      path: "postId",
    });

    const savedPosts = saved.map((item) => item.postId);
    
    console.log(userPosts,savedPosts);
    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};

export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const number = await Chat.countDocuments({
      userIDs: { $in: [tokenUserId] },
      seenBy: { $nin: [tokenUserId] },
    });
    res.status(200).json(number);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};
