import React from 'react'

import SizeChart from '../Components/ExtraPages/SizeChart'

function SizeChartPage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
  return (
    <>
    <SizeChart/>


    </>
  )
}

export default SizeChartPage