import React from 'react'
import AllProductsForCollection from '../Components/ProductsPerCollection/AllProductsForCollection'

function AllProductsPerCollectionPage() {
  
  React.useEffect(() => {
  window.scrollTo(0, 0);
  }, []);
  
  
 return (
  <>
     <AllProductsForCollection/>
  </>
  )
}

export default AllProductsPerCollectionPage