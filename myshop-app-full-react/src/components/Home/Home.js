import React from 'react'
import Slideshow from './Slideshow/Slideshow'
import LatestProducts from './LatestProducts/LatestProducts'
import { featureItemList } from './FeatureItem/FeatureItem';

const Home = () => {

  return (
    <main>
      <Slideshow />
      <LatestProducts />
      <section className='featureItems'>

        {featureItemList}

      </section>
    </main>
  )
}

export default Home