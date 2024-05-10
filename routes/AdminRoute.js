const express = require("express");
const router = express.Router();

const {createAdmin,loginAdmin,getAdmin} = require("../controllers/AdminController");

router.post('/api/v1/admin',createAdmin);
router.get('/api/v1/admin',getAdmin);
router.post('/api/v1/login',loginAdmin);





module.exports = router