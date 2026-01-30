import React, { useEffect } from "react";
import ExchangePolicy from "../Components/ExtraPages/ExchangePolicy";

function ExchangePolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ExchangePolicy />;
}

export default ExchangePolicyPage;
