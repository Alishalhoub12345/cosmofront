

import ProductsPerCategory from '../Components/ProductsPerCategory/ProductsPerCategory'
import React from 'react';

function ProductsPerCategoryPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
    
    
    
       <ProductsPerCategory/>
    
    
    
</>
  )
}

export default ProductsPerCategoryPage