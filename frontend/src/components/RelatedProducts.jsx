import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext'
import ProductItems from '../components/ProductItems'

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext)
    const [relatedProducts, setRelatedProducts] = useState([])


    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();

            productCopy = productCopy.filter((item) => category === item.category);
            // productCopy = productCopy.filter((item) => item.subCategory.includes(subCategory));

            setRelatedProducts(productCopy.slice(0, 10));
        }
    }, [products, category, subCategory]);


    return (
        <div className='my-24'>
            <div className=' text-2xl font-bold py-3 mb-10'>
                <p>Related Products</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 gap-y-6'>
                {
                    relatedProducts.map((item, index) => (
                        <ProductItems key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))

                }

            </div>
        </div>
    )
}

export default RelatedProducts