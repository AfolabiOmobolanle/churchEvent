
const userRoute = require("./routes/UserRoute")
const adminRoute = require("./routes/AdminRoute")

const dotenv = require("dotenv").config({path:".env"});
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");



const app = express();
app.use(express.json());

app.use('/user',userRoute);
app.use('/admin',adminRoute);

 let PORT = process.env.PORT || 2000;


app.listen(PORT,()=>{
    console.log(`Server is up amd running on port ${PORT}`)
})