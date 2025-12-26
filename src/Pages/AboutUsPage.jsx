import React from 'react'
import AboutUs from '../Components/ExtraPages/AboutUs';
import Characteristics from '../Components/Home/Characteristics';

function AboutUsPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <AboutUs/>
    <div className=' bg-white  py-[2%]'>
    <Characteristics />
    </div>
    </>
  )
}

export default AboutUsPage