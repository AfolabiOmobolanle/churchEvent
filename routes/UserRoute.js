const express = require("express");
const router = express.Router();

const {getAllUser,getUserByPhoneNumber,createUser} = require('../controllers/UserController')

router.get('/api/v1/user',getAllUser);
router.post('/api/v1/user',createUser);
router.get('/api/v1/user/:phonenumber',getUserByPhoneNumber)

module.exports = router