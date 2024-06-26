import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.routes.js";
import authRoute from "./routes/auth.routes.js";
import testRoute from "./routes/test.routes.js";
import userRoute from "./routes/user.routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
export { app };
