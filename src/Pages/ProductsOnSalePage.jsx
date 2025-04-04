import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import ProductsOnSale from '../Components/ProductsOnSale/ProductsOnSale'

function ProductsOnSalePage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
        
            <Navbar/>
       
        
            <ProductsOnSale/>

       
        
            <Footer/>
       
    </>
  )
}

export default ProductsOnSalePage