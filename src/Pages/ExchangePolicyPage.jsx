import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import ExchangePolicy from '../Components/ExtraPages/ExchangePolicy'

function ExchangePolicyPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Navbar/>
    <ExchangePolicy/>
    <Footer/>
    </>
  )
}

export default ExchangePolicyPage