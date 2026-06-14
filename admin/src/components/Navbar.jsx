import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const Navbar = ({ setToken }) => {


    const handleLogout = () => {
        localStorage.removeItem("AdminToken")
        setToken("")
        toast.success("Logout Successfully")
    }


    return (
        <div className='flex items-center py-2 bg-[#181824] text-white p-10'>
            <h3 className="sm:text-4xl text-2xl font-extrabold tracking-wide text-rose-600 group cursor-pointer transition duration-300 transform hover:scale-105 py-5 flex gap-2">
                SHOPS{' '}
                <span className="text-white group-hover:text-rose-500 drop-shadow-sm transition duration-300">
                    TIC
                </span>
            </h3>

            <div className='flex items-center justify-end w-full gap-5'>

                <button onClick={handleLogout} className='bg-gray-700 text-white px-5 py-4 sm:px-7 text-xs sm:text-sm cursor-pointer hover:bg-rose-600'> <span className='inline-block transition-transform duration-200 hover:scale-125'>Logout</span> </button>

            </div>

        </div>
    )
}

export default Navbar