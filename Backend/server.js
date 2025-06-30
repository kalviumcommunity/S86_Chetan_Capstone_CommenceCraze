require('dotenv'). config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');
const  mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

app.use(express.json())
 mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));



app.get('/', async (req,res) => {
    res.status(200).json({message:"Server is Running"})    
});

app.get('/get',async (req,res)=>{
    res.status(200).json({message:"My task of using GET API is Done"})
});

app.use(cookieParser()); // ✅ THIS IS ESSENTIAL

app.use('/user',authRouter);
app.use('/api',eventRouter);




app.listen( PORT ,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`)
});