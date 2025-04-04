import React from 'react'
import AllProductsForCollection from '../Components/ProductsPerCollection/AllProductsForCollection'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

function AllProductsPerCollectionPage() {
  
  React.useEffect(() => {
  window.scrollTo(0, 0);
  }, []);
  
  
 return (
  <>
    <Navbar/>
     <AllProductsForCollection/>
    <Footer/>
  </>
  )
}

export default AllProductsPerCollectionPage