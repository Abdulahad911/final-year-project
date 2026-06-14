import AdvImages from '../components/AdvImages'
import Cards from '../components/Cards'
import FeatureProducts from '../components/FeatureProducts'
import NewsLatterBox from '../components/NewsLatterBox'
import PopularProducts from '../components/PopularProducts'
import Swipper from '../components/Swipper'


const Home = () => {
  return (
    <div>
      <Swipper />
      <PopularProducts />
      <AdvImages />
      <FeatureProducts/>
      <NewsLatterBox/>
      <Cards/>
    </div>
  )
}

export default Home