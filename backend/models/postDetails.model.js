import mongoose from "mongoose";

const postDetailSchema = new mongoose.Schema(
  {
    desc: { type: String },
    utilities: { type: String },
    pet: { type: String },
    income: { type: String },
    size: { type: Number },
    school: { type: Number },
    bus: { type: Number },
    restaurant: { type: Number },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    // postId: { type: mongoose.Schema.Types.ObjectId, unique: true, required: true },
  },
  { timestamps: true }
);

export const PostDetails = mongoose.model("PostDetail", postDetailSchema);