import React from 'react'
import ResetPassword from '../Components/LoginAndRegistration/ResetPassword'

function ResetPasswordPage() {
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
        <ResetPassword/>
    </>
  )
}

export default ResetPasswordPage