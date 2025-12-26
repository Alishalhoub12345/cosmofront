import React from 'react'
import OrdersHistory from '../Components/Account/OrdersHistory'

function OrdersHistoryPage() {
   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <>
    <OrdersHistory/>
    </>
  )
}

export default OrdersHistoryPage