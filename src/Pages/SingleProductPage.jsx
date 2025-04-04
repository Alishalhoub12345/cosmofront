import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import CollectionCarousel from '../Components/Home/CollectionCarousel'
import SingleProduct from '../Components/SingleProduct/SingleProduct'

function SingleProductPage() {

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      
  return (
    <>
        
            <Navbar/>
        
        
            <SingleProduct/>
        
        
            <CollectionCarousel/>
        
        
            <Footer/>
        
    </>
  )
}

export default SingleProductPage