import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Address from '../Components/LoginAndRegistration/SignUP/Address'
import Footer from '../Components/Footer/Footer'

function AddressPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  
  return (
    <>
    <Navbar/>
    <Address/>
    <Footer/>
    </>
  )
}

export default AddressPage