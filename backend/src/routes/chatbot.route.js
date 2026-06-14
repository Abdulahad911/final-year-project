import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'

const chatbotRouter = express.Router()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

chatbotRouter.post('/chat', async (req, res) => {
    try {
        const { message } = req.body

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `You are a helpful shopping assistant for SHOPSTIC 
            online store based in Pakistan. Help customers find products, 
            answer questions about orders, shipping, returns and general 
            shopping queries. Be friendly, helpful and concise. 
            Currency is Pakistani Rupees (Rs).`
        })

        const result = await model.generateContent(message)
        const response = result.response.text()

        return res.json({ 
            success: true, 
            message: response
        })

    } catch (error) {
        console.log("Chatbot error:", error.message)
        return res.status(500).json({ 
            success: false, 
            message: "Chatbot error please try again" 
        })
    }
})

export default chatbotRouter