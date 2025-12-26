import React from 'react'
import OrderSuccessful from '../Components/Popups/OrderSuccessful';

function OrderSuccessfulPage() {

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <OrderSuccessful/>
    </>
  )
}

export default OrderSuccessfulPage