import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import FAQ from "../Components/ExtraPages/FAQ";
import Footer from "../Components/Footer/Footer";

function FAQPage() {
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
      <Navbar />
      <FAQ />
      <Footer />
    </>
  );
}

export default FAQPage;
