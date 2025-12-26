import React from 'react'
import Checkout from '../Components/Checkout/Checkout'

function CheckoutPage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <>
    <Checkout/>
    </>
  )
}

export default CheckoutPage