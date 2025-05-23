const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json())



app.get('/', async (req,res) => {
    res.status(200).json({message:"Server is Running"})    
});

app.get('/get',async (req,res)=>{
    res.status(200).json({message:"My task of using GET API is Done"})
})




app.listen( PORT ,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`)
});