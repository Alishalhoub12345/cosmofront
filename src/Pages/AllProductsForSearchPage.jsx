import React from 'react'

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
    <AllProductsForSearch searchQuery={query}/>
    </>
  )
}

export default AllProductsForSearchPage