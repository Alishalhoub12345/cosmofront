import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import ProductsPerDepartment from '../Components/ProductsPerDepartment/ProductsPerDepartment';

function ProductsPerDepartmentPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
    <Navbar/>
    <ProductsPerDepartment/>
    <Footer/>
    
    </>
  )
}

export default ProductsPerDepartmentPage