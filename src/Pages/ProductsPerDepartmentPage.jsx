import React from 'react'

import ProductsPerDepartment from '../Components/ProductsPerDepartment/ProductsPerDepartment';

function ProductsPerDepartmentPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
    <ProductsPerDepartment/>
    
    </>
  )
}

export default ProductsPerDepartmentPage