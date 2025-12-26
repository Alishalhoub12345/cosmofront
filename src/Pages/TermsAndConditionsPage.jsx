import React from 'react'
import TermsAndConditions from '../Components/ExtraPages/TermsAndConditions'

function TermsAndConditionsPage() {

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      
  return (
    <>
    <TermsAndConditions/>
    
    </>
  )
}

export default TermsAndConditionsPage