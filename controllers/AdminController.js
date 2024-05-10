import { PrismaClient } from "@prisma/client";
var db = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 12;

const createAdmin = async (req,res)=>{
try { 
    const { username, email, password } = req.body;

    const existingAdmin = await db.admin.findUnique({
        where:{
            username:username,
            email:email
        }
    });
    if (existingAdmin) {
        return res.status(400).json("User already exist! Please use another email and username")
    }

    const hashedPassword  = await bcrypt.hashSync(password,saltRounds);

    console.log(hashedPassword);

    const newAdmin = await db.admin.create({
        data:{
            username:username,
            email:email,
            password:password
        }
    })
    const resp= {
        data:newAdmin,
        message:"admin created"
        
    }
    res.status(200).json(resp)
} catch (error) {
    res.status(500).json({
        error:error.message
    })
}
}


const loginAdmin = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const admin = await db.admin.findFirst({
            where:{
                email:email
            }
        });
        if (!admin) {
            res.status(200).json({message:"Wrong password or username"})
        }

        const passwordMatched = await db.admin.findFirst
    (
        password,admin.password

    )
    if (!passwordMatched) {
        return res.status(200).json({message:"Wrong password or username"})
    }
    res.status(200).json({data:{adminId:admin.id, email:admin.email}})
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

}

const getAdmin = async (req,res) =>{
const admin = await db.admin.findMany({});
res.status(200).json(admin)
}


module.exports={
createAdmin,
 loginAdmin,
 getAdmin
}