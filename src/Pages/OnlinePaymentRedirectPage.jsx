import React from 'react'
import OnlinePaymentRedirect from '../Components/Popups/OnlinePaymentRedirect'

function OnlinePaymentRedirectPage() {
   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    
    <>
    <OnlinePaymentRedirect/>
    </>
  )
}

export default OnlinePaymentRedirectPage