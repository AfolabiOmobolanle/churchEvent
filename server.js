const express = require("express");
const userRoute = require("./routes/UserRoute")
const adminRoute = require("./routes/AdminRoute")


const app = express();
app.use(express.json());

app.use('/user',userRoute);
app.use('/admin',adminRoute);

let PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log("Server is up amd running")
})