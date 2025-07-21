import { Link, useParams } from "react-router-dom";
import cart from "../../images/Navbar/white-cart.png";
import { useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useState } from "react";
function OrderSuccessful() {
  const { orderId } = useParams();
  const { cartRefNumber } = useParams();
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const selectedLang = localStorage.getItem("lang");

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
      setLang(selectedLang);
    }
  }, [i18n]);

  const isArabic = lang === "ar";
  useEffect(() => {
    updateCartStatus();
    const isLoggedIn =
      localStorage.getItem("firstName") && localStorage.getItem("clientInfo");

    Object.keys(localStorage).forEach((key) => {
      if (isLoggedIn) {
        if (
          key !== "currencyUsed" &&
          key !== "firstName" &&
          key !== "clientInfo" &&
          key !== "lang"
        ) {
          localStorage.removeItem(key);
        }
      } else {
        if (key !== "currencyUsed" && key !== "lang") {
          localStorage.removeItem(key);
        }
      }
    });
    window.dispatchEvent(new Event("storage"));
  }, []);

  const updateCartStatus = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/cart-status-update/${cartRefNumber}`
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("The Cart Doesn't Exist");
      } else {
        // Handle other errors if needed
        console.error("An error occurred", error);
      }
    }
  };

  return (
    <div className="w-[100%] h-[90vh]">
      <div className="w-[100%] h-[90%] absolute z-[2] flex justify-center items-center">
        <div className=" w-[450px] h-[300px] xl:right-[28%] xl:top-[40%] flex justify-center items-center">
          <div className="bg-white w-[80%] h-[100%] flex justify-center items-center flex-col gap-[3%]">
            <div className=" flex justify-center items-center flex-col">
              <div className=" w-[70px] bg-[#D1D4E0] h-[70px] rounded-full flex items-center justify-center">
                <div className=" w-[55px] bg-[#B1B6CA] h-[55px] rounded-full flex items-center justify-center">
                  <div className=" pr-[8%] bg-[#656E9A] w-[40px] h-[40px] rounded-full flex items-center justify-center ">
                    <div className=" w-[20px] ">
                      <img
                        className="w-[100%] h-[100%] object-cover"
                        src={cart}
                        alt=""
                      ></img>
                    </div>
                  </div>
                </div>
              </div>

              <p className=" font-[600]  text-center">
                {t("popUps.orderPlaced.title")}
              </p>
            </div>
            <p className="text-center"> {t("popUps.orderPlaced.p1")}</p>
            <div className="w-[100%] h-[40px] flex items-center justify-center">
              <Link
                to="/"
                className=" w-[90%] h-[40px] text-white
                    bg-[#676f98] hover:bg-[#2f4672]
                    hover:text-[#E79E7F] flex justify-center items-center"
              >
                {t("popUps.orderPlaced.btn")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessful;
