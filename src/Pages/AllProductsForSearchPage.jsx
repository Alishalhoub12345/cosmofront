import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import AllProductsForSearch from '../Components/AllProductsForSearch/AllProductsForSearch';
import { useLocation } from 'react-router-dom';

function AllProductsForSearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <>
    <Navbar/>
    <AllProductsForSearch searchQuery={query}/>
    <Footer/>
    </>
  )
}

export default AllProductsForSearchPage