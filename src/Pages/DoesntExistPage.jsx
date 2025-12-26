import React from 'react'
import DoesntExist from '../Components/ExtraPages/DoesntExist'

function DoesntExistPage() {
     React.useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
  return (
      <>
          <DoesntExist />
      </>
  )
}

export default DoesntExistPage