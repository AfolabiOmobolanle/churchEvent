const express = require("express");
const router = express.Router();

const { createAdmin, loginAdmin, getAdmin } = require("../controllers/AdminController");

// Define routes
router.post('/create', createAdmin);
router.get('/', getAdmin);
router.post('/login', loginAdmin);

module.exports = router;
