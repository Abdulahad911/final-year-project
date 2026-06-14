import { LoginAdmin, LoginUser, RegisterUser } from "../controllers/auth.controller.js"
import express from 'express'

const authRoutes = express.Router()

authRoutes.post('/register', RegisterUser)
authRoutes.post('/login', LoginUser)
authRoutes.post('/admin', LoginAdmin)


export default authRoutes
