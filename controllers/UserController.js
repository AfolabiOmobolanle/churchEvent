const {PrismaClient} = require('@prisma/client');
const { sendMail } = require('../utils/mailHandler');

var db = new PrismaClient();

const createUser = async (req,res) =>{
try {
    const {fullname,location,gender,churchName,phoneNumber,dateOfBirth,RCCG} = req.body;
 const existingUser = await db.user.findUnique({
    where:{
        fullname:fullname
    }
 })
if (existingUser) {
    return res.status(400).json("A user with the same fullname already exists")
}
//save to db
const newUser = await db.user.create({
    fullname:fullname,
    location:location,
    gender: gender,
    churchName:churchName,
    phoneNumber:phoneNumber,
    dateOfBirth:dateOfBirth,
    RCCG:RCCG
    
})
//send mail 
sendMail("event title", newUser.fullname)
const response = {
    data:newUser,
    message:"user registered successfully"
}
res.status(200).json(response)
}catch (error) {
    res.status(500).json({
        error:error.message
    })
}
}

const getUserByPhoneNumber = async (req,res) =>{
const user = await db.user.findUnique({
    where:{
        phoneNumber: req.params.phoneNumber
    }
});
res.status(200).json(user)
}

const getAllUser = async (req,res) =>{
    const user = await db.user.findMany({});
    res.status(200).json(user)
}

module.exports ={
    createUser,
    getUserByPhoneNumber,
    getAllUser
}