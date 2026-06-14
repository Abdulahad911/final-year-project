import userModel from "../models/auth.model.js";
import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const GenerateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    //send cookies
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return token
}


const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Already Register this email try Another Email Thank You" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "invalid Email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "password length must be 6 characters" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        })

        const user = await newUser.save();

        const token = GenerateToken(user._id, res)

        return res.send({
            success: true,
            message: "user Register Successfully",
            name: user.name,
            email: user.email,
            token: token
        })

    } catch (error) {
        console.log('Error in RegisterUser: ', error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (isMatchedPassword) {
            const token = GenerateToken(user._id, res);

            return res.send({
                success: true,
                message: "User login successfully",
                name: user.name,
                email: user.email,
                token: token
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }
    } catch (error) {
        console.log('Error in RegisterUser: ', error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const LoginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.status(200).json({ success: true, message: "admin login successfully", token })
        } else {
            return res.status(404).json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log('Error in AdminLogin: ', error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}



export { RegisterUser, LoginUser, LoginAdmin }