import React from 'react'
import SingleCollection from '../Components/ProductsPerCollection/ProductsPerCollection'


function ProductsPerCollectionPage() {
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
        
        
        
            <SingleCollection/>
        
        
        
        
    </>
  )
}

export default ProductsPerCollectionPage