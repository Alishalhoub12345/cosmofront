import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ResetPassword from '../Components/LoginAndRegistration/ResetPassword'
import Footer from '../Components/Footer/Footer'

function ResetPasswordPage() {
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
        <Navbar/>
        <ResetPassword/>
        <Footer/>
    </>
  )
}

export default ResetPasswordPage