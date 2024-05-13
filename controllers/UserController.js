const {PrismaClient} = require('@prisma/client');
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



module.exports ={
    createUser
}