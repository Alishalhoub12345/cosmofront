import React from 'react'
import OrderCanceled from '../Components/Popups/OrderCanceled'

function OrderCanceledPage() {
      React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
      <>
          <OrderCanceled />
      </>
  )
}

export default OrderCanceledPage