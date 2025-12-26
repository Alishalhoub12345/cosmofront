import React from 'react'

import CollectionCarousel from '../Components/Home/CollectionCarousel'
import SingleProduct from '../Components/SingleProduct/SingleProduct'

function SingleProductPage() {

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      
  return (
    <>
        
        
        
            <SingleProduct/>
        
        
            <CollectionCarousel/>
        
        
        
    </>
  )
}

export default SingleProductPage