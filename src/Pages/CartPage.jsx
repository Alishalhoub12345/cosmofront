import React from 'react'

import CartComponent from '../Components/Cart/CartComponent'

function CartPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>     
      
        <CartComponent/>
     
     
    </>
  )
}

export default CartPage