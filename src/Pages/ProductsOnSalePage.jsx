import React from 'react'

import ProductsOnSale from '../Components/ProductsOnSale/ProductsOnSale'

function ProductsOnSalePage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
        
       
        
            <ProductsOnSale/>

       
        
       
    </>
  )
}

export default ProductsOnSalePage