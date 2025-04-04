import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Login from '../Components/LoginAndRegistration/Login'
import Footer from '../Components/Footer/Footer'

function LoginPage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <>
    <Navbar/>
    <Login/>
    <Footer/>
    </>
  )
}

export default LoginPage