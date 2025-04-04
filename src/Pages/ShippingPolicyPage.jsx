import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import ShippingPolicy from '../Components/ExtraPages/ShippingPolicy'

function ShippingPolicyPage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
    <Navbar/>
    <ShippingPolicy/>
    <Footer/>
    </>
  )
}

export default ShippingPolicyPage