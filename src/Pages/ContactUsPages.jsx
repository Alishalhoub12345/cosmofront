import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import ContactUs from '../Components/ExtraPages/ContactUs'

function ContactUsPages() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Navbar/>
    <ContactUs/>
    <Footer/>
    </>
  )
}

export default ContactUsPages