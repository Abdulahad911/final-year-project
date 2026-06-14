import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopeContext';


const TopNavbar = () => {

  const { GetCartCount, token, handleLogout } = useContext(ShopContext)
  const [search, setSearchData] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/collection?search=${encodeURIComponent(search.trim())}`);
    }
  };
  return (
    <div className='flex items-center justify-between py-3 sm:h-[13vh] h-[10vh] font-medium border-b-1 border-gray-300 '>

      <Link to={'/'}><img className='sm:w-40 w-32 overflow-hidden h-28 sm:h-28 object-contain' src={assets.logo} /></Link>

      <div className="relative w-full max-w-md hidden sm:block">
        <input
          type="text"
          placeholder="Search for items..."
          value={search}
          onChange={(e) => setSearchData(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation()
              handleSearch()
            }
          }}
          className="w-full px-12 py-3 border border-gray-300 rounded-md outline-none"
        />
        <FaSearch onClick={handleSearch} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer" />

      </div>

      <div className='relative flex sm:gap-10 gap-3 justify-between items-center'>

        {/* <div className=' hidden relative sm:gap-2 sm:flex items-center cursor-pointer'>
          <CiHeart className='text-3xl min-w-5' />
          <p className='absolute left-[-5px] top-[-10px] w-6 flex items-center justify-center text-center leading-4 bg-green-800 text-white aspect-square text-[10px] rounded-full'>10</p>
          <p className='font-normal'>Wishlist</p>
        </div> */}

        <p onClick={()=> navigate('/orders')} className='cursor-pointer'>My Orders</p>

        <div onClick={() => navigate('/cart')} className='relative sm:gap-2 flex items-center cursor-pointer'>
          <FaCartArrowDown className='text-3xl min-w-5' />
          <p className='absolute left-[-5px] top-[-10px] w-6 flex items-center justify-center text-center leading-4 bg-green-800 text-white aspect-square text-[10px] rounded-full'>{GetCartCount()}</p>
          <p className='font-normal'>Cart</p>
        </div>

        {
          token ? (
            <button onClick={handleLogout} className="px-5 py-2 bg-green-700 text-white rounded-md hover:bg-red-500 duration-500 cursor-pointer hidden sm:block">Logout</button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 bg-green-700 text-white rounded-md hover:bg-red-500 duration-500 cursor-pointer hidden sm:block"
            >
              Sign in
            </button>
          )
        }

      </div>
    </div>
  )
}

export default TopNavbar