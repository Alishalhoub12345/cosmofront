import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import ManageAddress from '../Components/Account/ManageAddress';

function ManageAddressPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <Navbar/>
    <ManageAddress/>
    <Footer/>
    </>
  )
}

export default ManageAddressPage