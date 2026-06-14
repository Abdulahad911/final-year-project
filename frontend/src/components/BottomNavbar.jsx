import { NavLink } from 'react-router-dom';
import { MdAddCall } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

const BottomNavbar = () => {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/collection/men', submenu: ['Topwear', 'Bottomwear', 'Footwear'] },
    { name: 'Women', path: '/collection/women', submenu: ['Western', 'Footwear', 'Lingerie'] },
    { name: 'Kids', path: '/collection/kids', submenu: ['Toys', 'Clothing', 'Footwear'] },
    { name: 'Electronics', path: '/collection/electronics', submenu: ['Mobiles', 'Laptops', 'Accessories'] },
    { name: 'Fashion', path: '/collection/fashion', submenu: ['Men', 'Women', 'Kids'] },
    { name: 'Shoes', path: '/collection/shoes', submenu: ['Men', 'Women'] },
    { name: 'Watches', path: '/collection/watches', submenu: ['Digital', 'Analog', 'Smart'] },
    { name: 'Bags', path: '/collection/bags', submenu: ['Handbags', 'Travel Bags'] },
    { name: 'Home', path: '/collection/home', submenu: ['Furniture', 'Kitchen', 'Decor'] },
  ];

  return (
    <div className='sm:sticky top-0 z-50 bg-white sm:flex items-center justify-between py-6 sm:h-[13vh] h-[10vh] font-medium text-gray-900'>
      <ul className='hidden sm:flex ml-10 gap-8 text-sm '>
        {menuItems.map((item, index) => (
          <li key={index} className='relative group'>
            <NavLink
              to={item.path}
              className='flex flex-col items-center gap-1'
            >
              <div className="flex items-center gap-1">
                <p className='text-lg'>{item.name}</p>
                {item.submenu && <FaAngleDown className="text-sm mt-[2px]" />}
              </div>
            </NavLink>

            {/* Submenu Dropdown */}
            {item.submenu && (
              <ul className='absolute top-full left-0 min-w-max shadow-xl rounded-md hidden group-hover:block z-50 duration-400 bg-white '>
                {item.submenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-400 w-[200px]'
                  >
                    <NavLink
                      to={`/collection/${item.name.toLowerCase()}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                      className='block w-full'
                    >
                      {subItem}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Contact Info */}
      <div className='hidden sm:flex'>
        <div className='flex items-center gap-2 '>
          <MdAddCall className='text-3xl text-gray-800' />
          <p>Contact:</p>
          <div>
            <a href="tel:+919876543210" className='text-blue-500 dark:text-blue-300 ml-2'>+91 98765 43210</a>
            <p>24/7 Support Center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
