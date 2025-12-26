import React from 'react'
import Registration from '../Components/LoginAndRegistration/SignUP/Registration'

function RegistrationPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
   <Registration/>
    </>
  )
}

export default RegistrationPage