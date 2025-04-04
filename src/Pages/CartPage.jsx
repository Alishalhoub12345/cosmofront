import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import CartComponent from '../Components/Cart/CartComponent'

function CartPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      
        <Navbar/>
     
      
        <CartComponent/>
     
      
        <Footer/>
     
    </>
  )
}

export default CartPage