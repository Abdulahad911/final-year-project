import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    return (
        <div className='w-[20%] min-h-screen border-r-2 bg-[#181824] text-white mt-0.5'>
            <div className='flex flex-col gap-2 pt-6 m-5 text-[15px]'>

                <div className='flex flex-col gap-3'>
                    <NavLink to={'/add'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-500 transition duration-300 ">
                        <img className='dark:invert brightness-200' src="" alt="" />
                        <p className='hidden md:block'>Add products</p>
                    </NavLink>
                    <NavLink to={'/list'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-500 transition duration-300">
                        <img className='dark:invert brightness-200' src="" alt="" />
                        <p className='hidden md:block'>List products</p>

                    </NavLink>
                    <NavLink to={'/order'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-500 transition duration-300">
                        <img className='dark:invert brightness-200' src="" alt="" />
                        <p className='hidden md:block'>Orders</p>
                    </NavLink>
                    {/* <NavLink to={'/commentslist'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-500 transition duration-300">
                        <img className='dark:invert brightness-200' src="" alt="" />
                        <p className='hidden md:block'>Review And Ratings</p>
                    </NavLink> */}
                </div>

                {/* add product section end */}


                {/* adv section start here  */}

                <div className='flex flex-col gap-3'>
                    <NavLink to={'/addadv'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-500 transition duration-300 ">
                        <img className='dark:invert brightness-200' src="" alt="" />
                        <p className='hidden md:block'>Banner advertisement</p>
                    </NavLink>

                    <NavLink to={'/listadv'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-500 transition duration-300">
                        <img className='dark:invert brightness-200' src="" alt="" />
                        <p className='hidden md:block'>List advertisement</p>
                    </NavLink>
                </div>

            </div>
        </div>
    )
}

export default Sidebar