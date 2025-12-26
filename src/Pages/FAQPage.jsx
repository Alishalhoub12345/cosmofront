import React from "react";
import FAQ from "../Components/ExtraPages/FAQ";

function FAQPage() {
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
      <FAQ />
    </>
  );
}

export default FAQPage;
