import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import DoesntExist from '../Components/ExtraPages/DoesntExist'
import Footer from '../Components/Footer/Footer'

function DoesntExistPage() {
     React.useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
  return (
      <>
          <Navbar />
          <DoesntExist />
          <Footer/>
      </>
  )
}

export default DoesntExistPage