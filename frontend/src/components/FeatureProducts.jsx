import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext'
import ProductItems from './ProductItems'
import { assets } from '../assets/assets'

const FeatureProducts = () => {
  const { products } = useContext(ShopContext)
  const [featureProducts, setFeatureProducts] = useState([])

  useEffect(() => {
    const filtered = products.filter((item) => item.featureProducts)
    setFeatureProducts(filtered.slice(0, 4))
  }, [products])

  return (
    <div className='mt-5'>
      <h2 className='text-2xl font-normal mb-4'>Featured Products</h2>

      <div className='w-full overflow-x-auto sm:overflow-visible'>
        <div className='flex sm:grid sm:grid-cols-3 md:grid-cols-5 gap-2'>

          {featureProducts.map((item, index) => (
            <div key={index} className='min-w-[150px] sm:min-w-0 '>
              <ProductItems
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}

          <img
            className='hidden sm:block w-full h-auto rounded-xl'
            src={assets.simg5}
            alt="featured banner"
          />
        </div>
      </div>
    </div>
  )
}

export default FeatureProducts
