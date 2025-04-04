import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import PersonalInformation from '../Components/Account/PersonalInformation'

function PersonalInformationPage() {
   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <>
    <Navbar/>
    <PersonalInformation/>
    <Footer/>

    </>
  )
}

export default PersonalInformationPage