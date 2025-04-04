import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import PaymentPolicy from '../Components/ExtraPages/PaymentPolicy';

function PaymentPolicyPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <Navbar/>
   <PaymentPolicy/>
    <Footer/>
    
    </>
  )
}

export default PaymentPolicyPage