import React from 'react'
import ProductsPerSubcategory from '../Components/ProductsPerSubcategory/ProductsPerSubcategory'

function ProductsPerSubcategoryPage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <>
       
       
        
            <ProductsPerSubcategory/>
       
        
        
    </>
  )
}

export default ProductsPerSubcategoryPage