import React from 'react'

import AllProductsOnSale from '../Components/ProductsOnSale/AllProductsOnSale';
function AllProductsOnSalePage() {

React.useEffect(() => {
  window.scrollTo(0, 0);
  }, []);
  

  return (
    <>
    <AllProductsOnSale/>
    </>
  )
}

export default AllProductsOnSalePage