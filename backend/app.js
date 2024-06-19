import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import postRoute from './routes/post.routes.js'
import authRoute from './routes/auth.routes.js'


const app=express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/posts",postRoute)
app.use("/api/auth",authRoute)
export {app}