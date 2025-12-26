import React from 'react'

import PaymentPolicy from '../Components/ExtraPages/PaymentPolicy';

function PaymentPolicyPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
   <PaymentPolicy/>
    
    </>
  )
}

export default PaymentPolicyPage