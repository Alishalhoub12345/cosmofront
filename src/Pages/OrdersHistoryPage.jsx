import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import OrdersHistory from '../Components/Account/OrdersHistory'
import Footer from '../Components/Footer/Footer'

function OrdersHistoryPage() {
   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <>
    <Navbar/>
    <OrdersHistory/>
    <Footer/>
    </>
  )
}

export default OrdersHistoryPage