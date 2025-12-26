import React from 'react'
import Address from '../Components/LoginAndRegistration/SignUP/Address'

function AddressPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  
  return (
    <>
    <Address/>
    </>
  )
}

export default AddressPage