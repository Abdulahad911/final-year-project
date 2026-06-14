import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopeContext.jsx';
import ProductItems from '../components/ProductItems';

const PopularProducts = () => {
    const { products } = useContext(ShopContext);
    const [popularProduct, setPopularProduct] = useState([]);
    const [active, setActive] = useState('Fashion');
    const [category, setcategory] = useState([]);
    const [subcategory, setsubcategory] = useState([]);
    const [filterProduct, setFilterProducts] = useState([]);


    const toggleProduct = (value) => {
        const upperValue = value.toUpperCase();
        if (category.includes(upperValue)) {
            setcategory(prev => prev.filter(item => item !== upperValue));
        } else {
            setcategory(prev => [...prev, upperValue]);
        }
    };

    // Apply filter on products
    const applyFilter = () => {
        let productCopy = products.slice();

        if (category.length > 0) {
            productCopy = productCopy.filter(item =>
                category.includes(item.category?.toUpperCase())
            );
        }

        if (subcategory.length > 0) {
            productCopy = productCopy.filter(item =>
                subcategory.includes(item.subCategory)
            );
        }

        setFilterProducts(productCopy.slice(0, 10));
    };



    useEffect(() => {
        applyFilter();
    }, [category, subcategory, products]);


    const navItems = [
        { name: 'Home' },
        { name: 'Men' },
        { name: 'Women' },
        { name: 'Kids' },
        { name: 'Electronics' },
        { name: 'Fashion' },
        { name: 'Shoes' },
        { name: 'Watches' },
        { name: 'Bags' },
        { name: 'Groceries' },
        { name: 'Beauty' },
        { name: 'Footware' }

    ];

    return (
        <div className='mt-10'>
            <div className='py-8 text-2xl font-semibold flex flex-col sm:flex-row sm:justify-between gap-4'>
                <p>Popular Products</p>

                <div className='overflow-x-auto w-full sm:w-auto'>
                    <ul className='flex gap-6 text-sm min-w-max px-2 sm:px-0'>
                        {navItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    toggleProduct(item.name);
                                }}
                                className={`cursor-pointer text-lg flex flex-col items-center px-2 py-1 whitespace-nowrap ${category.includes(item.name.toUpperCase())
                                    ? 'border-b-2 border-blue-700 text-blue-700'
                                    : 'hover:scale-105'
                                    }`}

                            >
                                <p>{item.name}</p>
                                <hr
                                    className={`mt-3 ${active === item.name
                                        ? 'bg-blue-700 block'
                                        : 'hidden'
                                        }`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Product Grid */}
            <div className='w-full overflow-x-auto sm:overflow-visible'>
                <div className='flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-1'>
                    {filterProduct.map((item, index) => (
                        <div key={index} className='min-w-[200px] sm:min-w-0'>
                            <ProductItems
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default PopularProducts;
