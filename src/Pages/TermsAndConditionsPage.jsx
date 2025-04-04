import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import TermsAndConditions from '../Components/ExtraPages/TermsAndConditions'
import Footer from '../Components/Footer/Footer'

function TermsAndConditionsPage() {

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      
  return (
    <>
    <Navbar/>
    <TermsAndConditions/>
    <Footer/>
    
    </>
  )
}

export default TermsAndConditionsPage