import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (username == "" || email == "" || password == "") {
    throw new ApiError(400, "All fields are required");
  }

  if (password != confirmPassword) {
    throw new ApiError(400, "Password not matched");
  }

  const checkUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (checkUsername) {
    throw new ApiError(400, "Username already exists");
  }
  const checkEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (checkEmail) {
    throw new ApiError(400, "Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    throw new ApiError(400, "User Creation Failed");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, newUser, "User Registered Successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    throw new ApiError(400, "All fields are required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(400, "Uer not Found");
  }

  const isPasswordValid = await bcrypt.compare(password,user.password)

  if(!isPasswordValid){
    throw new ApiError(400,"Invalid Password")
  }
  
  return res
  .status(201)
  .json(new ApiResponse(200,user,"Logged in successfully"))
});

export const logout = asyncHandler(async (req, res) => {
  //db operation
  console.log("Logout");
});
