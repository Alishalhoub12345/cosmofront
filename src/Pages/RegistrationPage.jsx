import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Registration from '../Components/LoginAndRegistration/SignUP/Registration'
import Footer from '../Components/Footer/Footer'

function RegistrationPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Navbar/>
   <Registration/>
    <Footer/>
    </>
  )
}

export default RegistrationPage