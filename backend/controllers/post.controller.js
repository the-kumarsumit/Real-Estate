import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { SavedPost } from "../models/savedPost.model.js";
import { PostDetails } from "../models/postDetails.model.js";

export const getPosts = async (req, res) => {
  const query = req.query;
  const city = query.city.toLowerCase();  // Ensure city is case insensitive

  const filterConditions = {};

  // City is required, so add it to the filter
  if (city) {
    filterConditions.city = city;
  }

  // Type is optional, add it if available
  if (query.type) {
    filterConditions.type = query.type;
  }

  // Property is optional, add it if available
  if (query.property && query.property !== "any") {
    filterConditions.property = query.property;
  }

  // Bedroom is optional, add it if available
  if (query.bedroom) {
    filterConditions.bedroom = parseInt(query.bedroom);
  }

  // Price range: Add conditions for price range (minPrice, maxPrice)
  const priceConditions = {};
  if (query.minPrice) {
    priceConditions.$gte = parseInt(query.minPrice);
  }
  if (query.maxPrice) {
    priceConditions.$lte = parseInt(query.maxPrice);
  }



  try {
    const posts = await Post.find(filterConditions);

    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get posts" });
  }
};



export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id)
      .populate({
        path: "postDetail",
      })
      .populate({
        path: "userId",
        select: "username avatar",
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          return res.status(200).json({ ...post, isSaved: false });
        }

        const saved = await SavedPost.findOne({
          userId: payload.id,
          postId: id,
        });
        
        return res.status(200).json({ ...post, isSaved: saved ? true : false });
      });
    } else {
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};



export const addPost = async (req, res) => {
  const {
    title,
    price,
    address,
    city,
    bedroom,
    bathroom,
    type,
    property,
    latitude,
    longitude,
    utilities,
    pet,
    income,
    size,
    school,
    bus,
    restaurant,
    desc,
  } = req.body;

  const tokenUserId = req.userId;

  try {
    
    const images = req.files.map((file) => file.path);
    const uploadPromises = images.map((image) =>
      uploadOnCloudinary(image, "images")
    );
    const uploadedImageUrls = await Promise.all(uploadPromises);
    const urls = uploadedImageUrls.map((url) => url?.secure_url);

    
    const newPost = await Post.create({
      title,
      price: Number(price) || 0,
      address,
      city:city.toLowerCase(),
      bedroom: Number(bedroom) || 0,
      bathroom: Number(bathroom) || 0,
      type,
      property,
      latitude,
      longitude,
      userId: tokenUserId,
      images: urls,
    });

    if (!newPost) {
      return res.status(500).json({ message: "Failed to create post" });
    }

    const postDetail = await PostDetails.create({
      desc,
      utilities,
      pet,
      income,
      size: Number(size) || 0,
      school: Number(school) || 0,
      bus: Number(bus) || 0,
      restaurant: Number(restaurant) || 0,
      post: newPost._id, 
    });

    if (!postDetail) {
      return res.status(500).json({ message: "Failed to create post details" });
    }

    newPost.postDetail = postDetail._id;
    await newPost.save();
    
    return res.status(200).json({ message: "Post created successfully", newPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, price, address, city, bedroom, bathroom, type, property, latitude, longitude, images } = req.body;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        price,
        address,
        city: city?.toLowerCase() || post.city,
        bedroom,
        bathroom,
        type,
        property,
        latitude,
        longitude,
        images,
      },
      { new: true }
    );

    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};


export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);
    

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await SavedPost.deleteMany({ post: id });

    if (post.postDetail) {
      await PostDetails.findByIdAndDelete(post.postDetail);
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};