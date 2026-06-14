import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ConnectDb from './src/config/connectDb.js';
import authRoutes from './src/routes/auth.route.js';
import ProductsRoutes from './src/routes/product.route.js';
import { advRoutes } from './src/routes/advertisement.route.js';
import userCartRoutes from './src/routes/userCart.route.js';
import OrderRoutes from './src/routes/userOrder.routes.js';
import connectCloudinary from './src/config/connectCloudinary.js';

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ CORS must be FIRST before everything
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}))

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Database
ConnectDb()
connectCloudinary()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/product', ProductsRoutes)
app.use('/api/adv', advRoutes)
app.use('/api/cart', userCartRoutes)
app.use('/api/payment', OrderRoutes)

app.listen(PORT, () => {
    console.info(`Server is Live at port: http://localhost:${PORT}`)
})