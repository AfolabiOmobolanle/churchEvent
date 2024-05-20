const express = require("express");
const router = express.Router();
const authenticateToken = require('../utils/protected');

const { createAdmin, loginAdmin, getAdmin } = require("../controllers/AdminController");

// Define routes
router.post('/create', createAdmin);
router.get('/',authenticateToken, getAdmin);
router.post('/login',loginAdmin);

module.exports = router;
