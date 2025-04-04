import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import SizeChart from '../Components/ExtraPages/SizeChart'

function SizeChartPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
  return (
    <>
    <Navbar/>
    <SizeChart/>

    <Footer/>

    </>
  )
}

export default SizeChartPage