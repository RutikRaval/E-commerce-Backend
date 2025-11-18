const express=require('express')
const app=express()
require('./config/Config')
const cors = require("cors");
const authRoute=require('./routes/AuthRoutes')
const bodyParser = require("body-parser");
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(bodyParser.json()); 

console.log("before-ROUTER:>>>>")
app.use('/auth',authRoute)
console.log("AFTER-ROUTER:>>>>")
module.exports=app