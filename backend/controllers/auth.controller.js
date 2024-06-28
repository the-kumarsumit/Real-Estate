import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import transporter from "../utils/sendMail.js";

export const generateOtp = async (req, res) => {
  const { username, email } = req.body;
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
  const checkOtp = await prisma.otp.findUnique({
    where: { email },
  });

  if (checkOtp) {
    await prisma.otp.delete({
      where: { email },
    });
  }

  const generatedOtp = String(
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  );
  try {
    const createdOtp = await prisma.otp.create({
      data: {
        email,
        otp: generatedOtp,
      },
    });
    if (!createdOtp) {
      return res
        .status(402)
        .json({ message: "There is problem generating otp" });
    }
    transporter.sendMail({
      from: '"Mern Estate"<kingbrawler2227@gmail.com>',
      subject: "Email verification",
      to: email,
      html: `<h1>Your <strong>Mern Estate</strong> otp is: <strong>${createdOtp.otp}</strong></h1><br><p>Otp is only valid till 5 minutes.</p>`,
    });

    return res.status(200).json({ message: "Otp sent successfully" });
  } catch (error) {
    return res.status(402).json({ message: "Can't send Otp" });
  }
};

export const register = async (req, res) => {
  const { username, email, password, otp } = req.body;
  if (!otp) {
    return res.status(402).json({ message: "Otp is required" });
  }
  
  const fetchedOtp = await prisma.otp.findUnique({
    where:{email}
  })

  if(!fetchedOtp){
    return res.status(401).json({message:"Please register again"})
  }

  if(otp!==fetchedOtp.otp){
    return res.status(401).json({message:"Invalid Otp"})
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
  await prisma.otp.delete({
    where:{email}
  })
  transporter.sendMail({
    from: '"Mern Estate"<kingbrawler2227@gmail.com>',
    subject: "Email verification",
    to: email,
    html: `<h2>Your registration on Mern Estate is successfully completed.</h2><br><p>Otp is only valid till 5 minutes.</p>`,
  });
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
    return res.status(400).json({ message: "User not Found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const age = 1000 * 60 * 60 * 24 * 7;
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: true,
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
    .json({ message: "Login successfull", userInfo });
};

export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
};
