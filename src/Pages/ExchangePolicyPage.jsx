import React from 'react'

import ExchangePolicy from '../Components/ExtraPages/ExchangePolicy'

function ExchangePolicyPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <ExchangePolicy/>
    </>
  )
}

export default ExchangePolicyPage