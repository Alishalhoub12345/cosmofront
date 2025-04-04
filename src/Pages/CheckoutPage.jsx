import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Checkout from '../Components/Checkout/Checkout'
import Footer from '../Components/Footer/Footer'

function CheckoutPage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <>
    <Navbar/>
    <Checkout/>
    <Footer/>
    </>
  )
}

export default CheckoutPage