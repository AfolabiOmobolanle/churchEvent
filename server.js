const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");


const userRoute = require("./routes/UserRoute");
const adminRoute = require("./routes/AdminRoute");

dotenv.config({ path: ".env" });

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Route setup
app.use('/api/v1/user', userRoute);
app.use('/api/v1/admin', adminRoute);

// Port setup
const PORT = process.env.PORT || 2000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
