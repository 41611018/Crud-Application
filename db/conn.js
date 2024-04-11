const mongoose = require("mongoose");
require('dotenv').config();
const DB = process.env.dbUrl
mongoose.connect(DB).then(()=> console.log("connection start")).catch((error)=>console.log(error.message));