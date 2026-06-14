import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewsLatterBox from '../components/NewsLatterBox'
import Cards from '../components/Cards'
import { ShopContext } from '../context/ShopeContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GridLoader } from 'react-spinners'

const Login = () => {

    const [CurrentState, setCurrentState] = useState("Login")
    const { token, setToken, BackEndUrl } = useContext(ShopContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    // console.log(name, email, password)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (CurrentState === 'signup') {
                const response = await axios.post(BackEndUrl + '/api/auth/register', {
                    name, email, password
                })
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("AuthUserToken", response.data.token)
                    navigate('Login')
                    toast.success(response.data.message);
                    console.log(response.data)
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(BackEndUrl + '/api/auth/login', {
                    email, password
                })
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("AuthUserToken", response.data.token)
                    toast.success(response.data.message);
                    console.log(response.data)
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong!";
            toast.error(message);
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])


    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] m-auto sm:max-w-[35%] mt-14 gap-3 text-gray-800 bg-white shadow-2xl p-10 '>

                <div>
                    <span className=' text-3xl'>{CurrentState}</span>
                </div>

                {CurrentState === "Login" ? "" : <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full max-w-96 px-3 py-3 border border-gray-400 outline-blue-500 rounded-lg ' placeholder='Enter Your Name' required />}
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full max-w-96 px-3 py-3 border border-gray-400 outline-blue-400 rounded-lg ' placeholder='Enter Your Email' required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full max-w-96 px-3 py-3 border border-gray-400 outline-blue-400 rounded-lg ' placeholder='Enter Password' required />

                {/* <div className='w-full flex justify-between mt-1 max-w-96'>
                    <span className='cursor-pointer text-xs sm:text-base  p-1 text-red-400 hover:text-black hover:border-b ml-3'>Forgot Your Password ?</span>
                </div> */}

                {
                    loading ? <GridLoader /> : <button type='submit' className='bg-green-700 text-white w-full py-3 cursor-pointer mt-3 hover:bg-red-500 transition duration-300'>{CurrentState === "Login" ? "Sign-In" : "Sign-Up"}</button>
                }


                <hr /> <h1>OR</h1> <hr />

                {
                    CurrentState === "Login"
                        ? <p className='text-lg sm:text-base p-2 text-red-400'>Not have an account<span onClick={() => setCurrentState("signup")} className='text-blue-600 cursor-pointer hover:text-black hover:border-b sm:ml-3' >Sign up</span> </p>
                        : <p className='text-lg sm:text-base p-2 text-red-400'>Already have an account <span onClick={() => setCurrentState("Login")} className='text-blue-500 cursor-pointer hover:text-black hover:border-b sm:ml-3 '>Login</span> </p>
                }
            </form>

            <div>
                <NewsLatterBox />
            </div>
            <div>
                <Cards />
            </div>


        </div>
    )
}

export default Login