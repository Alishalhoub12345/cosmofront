import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import OrderCanceled from '../Components/Popups/OrderCanceled'
import Footer from '../Components/Footer/Footer'

function OrderCanceledPage() {
      React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
      <>
          <Navbar />
          <OrderCanceled />
          <Footer/>
      </>
  )
}

export default OrderCanceledPage