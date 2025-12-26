import React from 'react'

import ShippingPolicy from '../Components/ExtraPages/ShippingPolicy'

function ShippingPolicyPage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
    <ShippingPolicy/>
    </>
  )
}

export default ShippingPolicyPage