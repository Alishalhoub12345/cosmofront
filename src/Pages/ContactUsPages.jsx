import React from 'react'

import ContactUs from '../Components/ExtraPages/ContactUs'

function ContactUsPages() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <ContactUs/>
    </>
  )
}

export default ContactUsPages