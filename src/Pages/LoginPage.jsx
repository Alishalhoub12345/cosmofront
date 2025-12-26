import React from 'react'
import Login from '../Components/LoginAndRegistration/Login'

function LoginPage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <>
    <Login/>
    </>
  )
}

export default LoginPage