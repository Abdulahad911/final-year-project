import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FaLocationDot, FaHeadphonesSimple, FaRegClock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="px-4 sm:px-8 lg:px-16 items-center">
            <div className='flex flex-col lg:grid lg:grid-cols-5 gap-12 my-7 mt-20 text-sm'>

                {/* Left column with logo & info */}
                <div className='flex flex-col gap-6 min-w-0'>
                    <img className="w-32 sm:w-40 object-contain" src={assets.logo} alt="" />

                    <p className='text-gray-700'>
                        Awesome grocery store website template
                    </p>

                    <div className='flex items-start gap-3'>
                        <FaLocationDot className='text-2xl text-green-700' />
                        <p className='text-sm text-gray-700'>
                            <span className="font-medium">Address:</span> 5171 W Campbell Ave <br /> Kent, Utah 53127 United States
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <FaHeadphonesSimple className='text-2xl text-green-700' />
                        <p className='text-sm text-gray-700'>
                            <span className="font-medium">Call Us:</span> (+91) - 540-025-124553
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <MdEmail className='text-2xl text-green-700' />
                        <p className='text-sm text-gray-700'>
                            <span className="font-medium">Email:</span> sale@Nest.com
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <FaRegClock className='text-2xl text-green-700' />
                        <p className='text-sm text-gray-700'>
                            <span className="font-medium">Hours:</span> 10:00 - 18:00, Mon - Sat
                        </p>
                    </div>
                </div>

                {/* Right columns with links */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 lg:col-span-4'>
                    <div>
                        <p className='text-xl font-medium mb-4'>COMPANY</p>
                        <ul className='flex flex-col gap-5'>
                            <Link to={'/'}><li>About Us</li></Link>
                            <Link to={'/about'}><li>Privacy Policy</li></Link>
                            <Link to={'/cart'}><li>Delivery Info</li></Link>
                            <Link><li>Terms & Conditions</li></Link>
                            <Link to={'/cart'}><li>Contact Us</li></Link>
                            <Link><li>Careers</li></Link>
                            <Link><li>Support Center</li></Link>
                            <Link><li>Investor Relations</li></Link>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xl font-medium mb-4'>SUPPORT</p>
                        <ul className='flex flex-col gap-5'>
                            <Link><li>Help Desk</li></Link>
                            <Link><li>FAQs</li></Link>
                            <Link><li>Order Tracking</li></Link>
                            <Link><li>Returns & Refunds</li></Link>
                            <Link><li>Shipping Guide</li></Link>
                            <Link><li>Account Support</li></Link>
                            <Link><li>Live Chat</li></Link>
                            <Link><li>Community Forum</li></Link>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xl font-medium mb-4'>SERVICES</p>
                        <ul className='flex flex-col gap-5'>
                            <Link><li>Affiliate Program</li></Link>
                            <Link><li>Gift Cards</li></Link>
                            <Link><li>Wholesale</li></Link>
                            <Link><li>Custom Orders</li></Link>
                            <Link><li>Corporate Sales</li></Link>
                            <Link><li>Special Discounts</li></Link>
                            <Link><li>Installation Service</li></Link>
                            <Link><li>Warranty Info</li></Link>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xl font-medium mb-4'>RESOURCES</p>
                        <ul className='flex flex-col gap-5'>
                            <Link><li>Blog</li></Link>
                            <Link><li>Press</li></Link>
                            <Link><li>Events</li></Link>
                            <Link><li>Community</li></Link>
                            <Link><li>Case Studies</li></Link>
                            <Link><li>Partnerships</li></Link>
                            <Link><li>Documentation</li></Link>
                            <Link><li>API Access</li></Link>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            {/* Copyright */}
            <div className='mt-10 mb-5 border-t p-4 flex flex-col md:flex-row items-center justify-between gap-4'>
                <p className='text-gray-800 text-center md:text-left'>
                    All rights reserved 2025
                </p>

                <div className='flex items-center gap-2 flex-wrap justify-center md:justify-end'>
                    <p className='text-lg font-medium'>Follow us</p>

                    <Link to={'https://www.facebook.com'} target="_blank" rel="noopener noreferrer">
                        <BsFacebook className='text-white bg-blue-600 text-xl p-2 rounded-full w-10 h-10 hover:scale-110 transition duration-300' />
                    </Link>

                    <Link to={'https://www.instagram.com'} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className='text-white bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-xl p-2 rounded-full w-10 h-10 hover:scale-110 transition duration-300' />
                    </Link>

                    <Link to={'https://www.twitter.com'} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className='text-white bg-blue-400 text-xl p-2 rounded-full w-10 h-10 hover:scale-110 transition duration-300' />
                    </Link>

                    <Link to={'https://www.youtube.com'} target="_blank" rel="noopener noreferrer">
                        <FaYoutube className='text-white bg-red-600 text-xl p-2 rounded-full w-10 h-10 hover:scale-110 transition duration-300' />
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Footer