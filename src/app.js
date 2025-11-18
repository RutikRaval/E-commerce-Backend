const express=require('express')
const app=express()
require('./config/Config')
const cors = require("cors");
const authRoute=require('./routes/AuthRoutes')
const bodyParser = require("body-parser");
const categoryRouter = require('./routes/CategoryRoutes');
const subCategoryRouter = require('./routes/SubCategoryRoutes');

app.use(cors({origin:'*'}));
app.use(express.json());
app.use(bodyParser.json()); 

app.use('/auth',authRoute)
app.use('/category',categoryRouter)
app.use('/sub-category',subCategoryRouter)

module.exports=app