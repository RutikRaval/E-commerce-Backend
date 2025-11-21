const express = require('express')
const app = express()
require('./config/Config')
const cors = require("cors");
const authRoute = require('./routes/AuthRoutes')
const cookieParser = require('cookie-parser');

const productRoute = require('./routes/ProductRoutes')
const bodyParser = require("body-parser");
const { storage } = require('./utils/Cloudinary')
const multer = require("multer");
const { uploadImage } = require('./service/UploadImage');
const { rateLimiter } = require('./middleware/RateLimiter');
const { auth } = require('./middleware/AuthToken');

app.use(cookieParser());
const categoryRouter = require('./routes/CategoryRoutes');
const subCategoryRouter = require('./routes/SubCategoryRoutes');

// In your Express app
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://192.168.54.43:5173' // Your IP
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // ← ADD Cookie
    exposedHeaders: ['Set-Cookie'] // ← ADD this
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
const upload = multer({ storage });

app.use('/auth', authRoute)
app.use('/products', productRoute)
app.post('/upload-image', rateLimiter, auth, upload.array('images', 10), uploadImage)
app.use('/category', categoryRouter)
app.use('/sub-category', subCategoryRouter)

module.exports = app