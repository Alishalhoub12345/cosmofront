import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductsPerSubcategory from '../Components/ProductsPerSubcategory/ProductsPerSubcategory'
import Footer from '../Components/Footer/Footer'

function ProductsPerSubcategoryPage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <>
       
            <Navbar/>
       
        
            <ProductsPerSubcategory/>
       
        
            <Footer/>
        
    </>
  )
}

export default ProductsPerSubcategoryPage