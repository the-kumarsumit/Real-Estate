import { app } from "./app.js"
import { connectDB } from "./db/connection.js";

app.listen(8000,()=>{
    console.log("Server Running");
})

connectDB();
