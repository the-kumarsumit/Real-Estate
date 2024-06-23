import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log(req.body);
  if (username == "" || email == "" || password == "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password != confirmPassword) {
    return res.status(400).json({ message: "Password not matched" });
  }

  const checkUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (checkUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const checkEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (checkEmail) {
    return res.status(400).json({ message: "Email already exists" });
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
    return res.status(400).json({ message: "Can't create user" });
  }
  return res.status(200).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({message:"User not Found"})
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({message:"Invalid Password"})
  }

  const age = 1000 * 60 * 60 * 24 * 7;
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: false,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: age }
  );
  const { password: userPassword, ...userInfo } = user;

  res
    .cookie("token", token, {
      httpOnly: true,
      // secure:true,
      maxAge: age,
    })
    .status(200)
    .json({message:"Login successfull",userInfo});

};

export const logout = async (req, res) => {
  res.clearCookie('token')
    .status(200)
    .json({ message: 'Logout successful' });
};
