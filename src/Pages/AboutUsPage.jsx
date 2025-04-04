import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import AboutUs from '../Components/ExtraPages/AboutUs';
import Footer from '../Components/Footer/Footer'
import Characteristics from '../Components/Home/Characteristics';

function AboutUsPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <Navbar/>
    <AboutUs/>
    <div className=' bg-white  py-[2%]'>
    <Characteristics />

    </div>
    <Footer/>
    </>
  )
}

export default AboutUsPage