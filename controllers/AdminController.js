const { PrismaClient } = require("@prisma/client");
var db = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 12;

const createAdmin = async (req,res)=>{
    console.log("This is working")
    const { username, email, password } = req.body;
    //validate data
    if (!username || !email || !password) {
        return res.status(400).json("Please enter username, password and email")
    }
    try {
        // Check if admin already exists with the provided username or email
        const existingAdmin = await db.admin.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });
    
        // If admin already exists, return an error response
        if (existingAdmin) {
            return res.status(400).json({ error: "User already exists! Please use another email and username" });
        }
    
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Create the new admin with the hashed password
        const newAdmin = await db.admin.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword // Use the hashed password instead of plain text
            }
        });
    
        // Prepare the response object
        const resp = {
            data: newAdmin,
            message: "Admin created successfully"
        };
    
        // Send a success response with the new admin data
        res.status(200).json(resp);
    } catch (error) {
        // If an error occurs during the process, return a generic error response
        res.status(500).json({ error: "Internal server error" + error});
    }
}

const loginAdmin = async (req,res) =>{
    const {email,password} = req.body;
    try {
        // Check if admin already exists with the provided username or email
        const existingAdmin = await db.admin.findFirst({
            where: {
                OR: [
                    { email: email },
                    { password: password }
                ]
            }
        });
    
        // If admin already exists, return an error response
        if (existingAdmin) {
            return res.status(400).json({ error: "User already exists! Please use another email and username" });
        }
    
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Create the new admin with the hashed password
        const newAdmin = await db.admin.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword // Use the hashed password instead of plain text
            }
        });
    
        // Prepare the response object
        const resp = {
            data: newAdmin,
            message: "Admin created successfully"
        };
    
        // Send a success response with the new admin data
        res.status(200).json(resp);
    } catch (error) {
        // If an error occurs during the process, return a generic error response
        res.status(500).json({ error: "Internal server error" + error });
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