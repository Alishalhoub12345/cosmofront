import React from 'react'
import SingleCollection from '../Components/ProductsPerCollection/ProductsPerCollection'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

function ProductsPerCollectionPage() {
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
        
            <Navbar/>
        
        
            <SingleCollection/>
        
        
            <Footer/>
        
        
    </>
  )
}

export default ProductsPerCollectionPage