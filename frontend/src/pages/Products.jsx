import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopeContext';
import { assets } from '../assets/assets';
import NewsLatterBox from '../components/NewsLatterBox';
import RelatedProducts from '../components/RelatedProducts';
import Cards from '../components/Cards';

const Products = () => {
  const { productId } = useParams();
  const { products,addToCart } = useContext(ShopContext);
  const [ProductData, setProductData] = useState(false);
  const [image, setimage] = useState('');
  const [size, setsize] = useState('');

  const navigate = useNavigate()

  const fetchData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setimage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [productId, products]);

  return (
    <div className="px-4 py-6">
      {/* Top Section: Product Images and Info */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col sm:flex-row gap-12">
          {/* Product Images Section */}
          <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
            {/* Side Images */}
            <div className="flex gap-2 sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] w-full">
              {
                ProductData?.image?.map((item, index) => (
                  <img
                    onClick={() => setimage(item)}
                    key={index}
                    src={item}
                    alt=""
                    className="w-20 h-20 sm:w-full sm:h-auto object-cover cursor-pointer rounded-lg border border-gray-200"
                  />
                ))
              }
            </div>

            {/* Main Image */}
            <div className="w-full sm:w-[80%]">
              <img
                src={image}
                alt=""
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex-1 mt-5">
            <p>{ProductData.name}</p>
            <div className="flex items-center gap-2 mt-3">
              <img src={assets.star_icon} alt="" />
            </div>

            <p className="text-3xl font-medium mt-5">Rs: {ProductData.price}</p>
            <p className="mt-3 md:w-4/5">{ProductData.description}</p>

            {ProductData && ProductData.sizes && (
              <div className="flex flex-col gap-2 my-8">
                <p className="text-2xl">Select Category</p>
                <div className="flex flex-wrap gap-2 w-full">
                  {ProductData.sizes.map((item, index) => (
                    <button
                      onClick={() => setsize(item)}
                      className={`px-4 py-3 border bg-gray-200 cursor-pointer ${item === size ? 'bg-orange-500 text-black dark:bg-orange-500' : ''}`}
                      key={index}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 m-auto items-center mt-3">
              <button onClick={() => addToCart(ProductData._id , size)} className="px-8 py-3 rounded-md bg-green-800 text-white opacity-80 cursor-pointer hover:bg-red-600 transition duration-200">
                Add to Cart
              </button>
            </div>

            {/* Product Extras */}
            <div className="flex flex-col gap-1 text-gray-600 mt-3">
              <p>100% original product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy exchange policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review and Description Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-4 py-2 text-sm">Description</b>
          <p className="border px-4 py-2 text-sm">(122)</p>
        </div>
        <div className="flex flex-col border text-sm gap-6 px-6 py-6 text-gray-400">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestias quos, consequuntur facere ex nostrum quibusdam magni modi aliquam veritatis similique veniam perferendis expedita dolorum numquam illo.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores nemo nisi repudiandae non vel eius atque necessitatibus deleniti cupiditate.</p>
        </div>
      </div>

      <div>
        <RelatedProducts category={ProductData.category} subCategory={ProductData.subCategory} />
      </div>

      {/* Newsletter */}
      <div className="mt-10">
        <NewsLatterBox />
      </div>

      <div>
        <Cards />
      </div>


    </div>
  );
};

export default Products;
