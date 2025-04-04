
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import ProductsPerCategory from '../Components/ProductsPerCategory/ProductsPerCategory'
import React from 'react';

function ProductsPerCategoryPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
    
        <Navbar/>
    
    
       <ProductsPerCategory/>
    
    
        <Footer/>
    
</>
  )
}

export default ProductsPerCategoryPage