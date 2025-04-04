import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import PrivacyPolicy from '../Components/ExtraPages/PrivacyPolicy'
import Footer from '../Components/Footer/Footer'

function PrivacyPolicyPage() {
   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
      <>
          <Navbar />
          <PrivacyPolicy />
          <Footer/>
      </>
  )
}

export default PrivacyPolicyPage