import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import OnlinePaymentRedirect from '../Components/Popups/OnlinePaymentRedirect'
import Footer from '../Components/Footer/Footer'

function OnlinePaymentRedirectPage() {
   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    
    <>
    <Navbar/>
    <OnlinePaymentRedirect/>
    <Footer/>
    </>
  )
}

export default OnlinePaymentRedirectPage