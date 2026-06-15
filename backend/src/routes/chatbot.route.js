import express from 'express'
import Groq from 'groq-sdk'

const chatbotRouter = express.Router()
const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
})

chatbotRouter.post('/chat', async (req, res) => {
    try {
        const { message } = req.body

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful shopping assistant for SHOPSTIC 
                    online store based in Pakistan. 
                    Store Details:
                    - Name: SHOPSTIC BIG MEGA SHOP
                    - Location: Pakistan
                    - Currency: Pakistani Rupees (Rs)
                    - Delivery Fee: Rs 250
                    - Delivery Time: 2 days
                    - Payment: Cash on Delivery only
                    - Working Hours: 10AM - 6PM
                    Categories: Men, Women, Kids, Electronics, 
                    Fashion, Shoes, Watches, Bags, Home, Groceries, Beauty
                    Be friendly, helpful and concise.
                    Reply in same language as customer (Urdu or English).`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 1024,
        })

        return res.json({ 
            success: true, 
            message: response.choices[0].message.content
        })

    } catch (error) {
        console.log("Chatbot error:", error.message)
        return res.status(500).json({ 
            success: false, 
            message: error.message
        })
    }
})

export default chatbotRouter