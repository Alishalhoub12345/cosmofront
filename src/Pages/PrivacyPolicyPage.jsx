import React from 'react'
import PrivacyPolicy from '../Components/ExtraPages/PrivacyPolicy'

function PrivacyPolicyPage() {
   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
      <>
          <PrivacyPolicy />
      </>
  )
}

export default PrivacyPolicyPage