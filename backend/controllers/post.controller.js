import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getPosts = async (req, res) => {
  const query = req.query;
  const city = query.city

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: city?.toLowerCase() || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    // setTimeout(() => {
    res.status(200).json(posts);
    // }, 3000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
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

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
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
    city=city.toLowerCase(),
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

    const uploadPromises = await images.map((image) =>
      uploadOnCloudinary(image, "images")
    );
    const uploadedImageUrls = await Promise.all(uploadPromises);
    const urls = uploadedImageUrls.map((url) => url?.secure_url);

    const newPost = await prisma.post.create({
      data: {
        title,
        price:Number(price)|| 0,
        address,
        city,
        bedroom:Number(bedroom)|| 0,
        bathroom:Number(bathroom)|| 0,
        type,
        property,
        latitude,
        longitude,
        userId: tokenUserId,
        images: urls,
        postDetail: {
          create: {
            utilities,
            pet,
            income,
            size:Number(size)|| 0,
            school:Number(school)|| 0,
            bus:Number(bus)|| 0,
            restaurant:Number(restaurant)|| 0,
            desc,
          },
        },
      },
    });

    if(!newPost){
      return res.status(500).json({ message: "Failed to create post" });
    }
    return res.status(200).json({message:"Post created successfully",newPost});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
