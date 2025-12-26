import React from 'react'
import ManageAddress from '../Components/Account/ManageAddress';

function ManageAddressPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <ManageAddress/>
    </>
  )
}

export default ManageAddressPage