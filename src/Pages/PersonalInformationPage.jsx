import React from 'react'
import PersonalInformation from '../Components/Account/PersonalInformation'

function PersonalInformationPage() {
   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <>
    <PersonalInformation/>

    </>
  )
}

export default PersonalInformationPage