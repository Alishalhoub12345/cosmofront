import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import AllProductsOnSale from '../Components/ProductsOnSale/AllProductsOnSale';
function AllProductsOnSalePage() {

React.useEffect(() => {
  window.scrollTo(0, 0);
  }, []);
  

  return (
    <>
    <Navbar/>
    <AllProductsOnSale/>
    <Footer/>
    </>
  )
}

export default AllProductsOnSalePage