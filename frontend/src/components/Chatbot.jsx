import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { BsChatDots } from 'react-icons/bs'
import { IoClose, IoSend } from 'react-icons/io5'

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { 
            role: 'bot', 
            text: '👋 Hi! I am SHOPSTIC Assistant. How can I help you today?' 
        }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async () => {
        if (!input.trim() || loading) return

        const userMessage = input
        setInput('')
        setMessages(prev => [...prev, { role: 'user', text: userMessage }])
        setLoading(true)

        try {
            const response = await axios.post(
                'http://localhost:9090/api/chatbot/chat',
                { message: userMessage }
            )
            setMessages(prev => [...prev, { 
                role: 'bot', 
                text: response.data.message 
            }])
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: 'bot', 
                text: '❌ Sorry something went wrong! Please try again.' 
            }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed bottom-5 right-5 z-50'>
            {/* Chat Window */}
            {isOpen && (
                <div className='w-80 h-[450px] bg-white shadow-2xl rounded-xl flex flex-col mb-4 border border-gray-200'>
                    
                    {/* Header */}
                    <div className='bg-green-700 text-white p-3 rounded-t-xl flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='w-3 h-3 bg-green-300 rounded-full animate-pulse'></div>
                            <p className='font-bold'>SHOPSTIC Assistant</p>
                        </div>
                        <IoClose 
                            className='cursor-pointer text-xl hover:text-red-300 transition duration-200' 
                            onClick={() => setIsOpen(false)} 
                        />
                    </div>

                    {/* Messages */}
                    <div className='flex-1 overflow-y-auto p-3 flex flex-col gap-2'>
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`p-2 rounded-lg text-sm max-w-[85%] ${
                                    msg.role === 'user' 
                                        ? 'bg-green-600 text-white self-end rounded-br-none' 
                                        : 'bg-gray-100 text-gray-800 self-start rounded-bl-none'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className='bg-gray-100 p-2 rounded-lg text-sm self-start flex gap-1'>
                                <span className='animate-bounce'>.</span>
                                <span className='animate-bounce delay-100'>.</span>
                                <span className='animate-bounce delay-200'>.</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className='p-3 border-t flex gap-2'>
                        <input
                            type='text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder='Type a message...'
                            className='flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500'
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className='bg-green-700 text-white p-2 rounded-lg hover:bg-green-800 transition duration-200 disabled:opacity-50'
                        >
                            <IoSend className='text-lg' />
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-800 transition duration-300 hover:scale-110'
            >
                <BsChatDots className='text-2xl' />
            </button>
        </div>
    )
}

export default Chatbot