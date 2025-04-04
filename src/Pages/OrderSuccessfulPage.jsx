import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import OrderSuccessful from '../Components/Popups/OrderSuccessful';
import Footer from '../Components/Footer/Footer';

function OrderSuccessfulPage() {

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <Navbar/>
    <OrderSuccessful/>
    <Footer/>
    </>
  )
}

export default OrderSuccessfulPage