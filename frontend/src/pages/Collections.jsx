import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopeContext';
import ProductItems from '../components/ProductItems';
import { assets } from '../assets/assets';
import NewsLatterBox from '../components/NewsLatterBox';
import Cards from '../components/Cards';

const Collections = () => {
  const { category, subCategory } = useParams();
  const { products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate()
  const location = useLocation();



  useEffect(() => {

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    let filtered = products;

    if (category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (subCategory) {
      filtered = filtered.filter(product =>
        product.subcategory?.toLowerCase().replace(/\s+/g, '-') === subCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }


    setFilteredProducts(filtered);
  }, [category, subCategory, products, location.search]);

  return (
    <div className='overflow-hidden'>
      {/* Header */}
      <div className='w-full bg-green-100 text-black flex text-center'>
        <h1 className="text-xl sm:text-2xl font-bold h-16 sm:h-20 flex items-center p-4 sm:p-10 capitalize">
          {subCategory || category || 'All Collections'}
        </h1>
      </div>

      <div className='flex flex-col lg:flex-row p-4 sm:p-6 gap-6 lg:gap-8'>
        {/* Sidebar */}
        <div className='w-full lg:w-[20%] shadow-2xl'>
          <div className='p-4 rounded-md'>
            <h2 className="text-base sm:text-lg font-semibold mb-2">Category</h2>
            <div className='space-y-2'>
              {[
                { label: 'Men', icon: assets.men },
                { label: 'Women', icon: assets.women },
                { label: 'Kids', icon: assets.kids },
                { label: 'Electronics', icon: assets.electronics },
                { label: 'Fashion', icon: assets.fashion },
                { label: 'Shoes', icon: assets.shoes },
                { label: 'Watches', icon: assets.watch },
                { label: 'Bags', icon: assets.bags },
                { label: 'Home', icon: assets.home },
                { label: 'Footwear', icon: assets.footwear },
                { label: 'Groceries', icon: assets.groceries },
                { label: 'Beauty', icon: assets.beauty },
              ].map(({ label, icon }) => (
                <div
                  key={label}
                  onClick={() => navigate(`/collection/${label.toLowerCase()}`)}
                  className={`flex gap-2 p-2 items-center border ${category?.toLowerCase() === label.toLowerCase()
                    ? 'border-black'
                    : 'border-transparent'
                    } hover:border-gray-500 cursor-pointer transition duration-300`}
                >
                  <img src={icon} alt={label} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                  <span className="text-sm sm:text-base font-medium">{label}</span>
                </div>
              ))}
            </div>

          </div>

          <div className='hidden sm:flex flex-col gap-4 mt-8'>
            <img src={assets.sidebanner1} alt="Side Banner 1" className="w-full h-auto rounded-md" />
            <img src={assets.sidebanner2} alt="Side Banner 2" className="w-full h-auto rounded-md" />
          </div>
        </div>

        {/* Products */}
        <div className='w-full lg:w-3/4'>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductItems
                  key={index}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          ) : (
            <p className='flex text-center justify-center mt-10 text-lg sm:text-2xl font-medium'>
              No products found
            </p>
          )}
        </div>
      </div>

      <NewsLatterBox />
      <Cards />
    </div>
  );
};

export default Collections;
