import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import Banner from '../Components/Home/Banner'
import CollectionCarousel from '../Components/Home/CollectionCarousel'
import CollectionImages from '../Components/Home/CollectionImages'
import Characteristics from '../Components/Home/Characteristics'
import Currency from '../Components/Currency/Currency'
import AnnouncementBar from '../Components/AnnouncementBar/AnnouncementBar'

function HomePage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    < >
        
            <Navbar/>
       
        
          <Banner/>
       
        
         <CollectionCarousel/>
       
        
          <CollectionImages/>
       
        
          <Characteristics/>
       
        
            <Footer/>

       
    </>
  )
}

export default HomePage