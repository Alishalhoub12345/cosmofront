import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosCheckmark } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import in2info from "../../images/AboutUs/in2info-logo.png";
import { useTranslation } from "react-i18next";

function Footer() {
  const [emailSub, setEmailSub] = useState("");
  const [t, i18n] = useTranslation("global");
  const [showPopUpEmail, setShowPopUpEmail] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const isArabic = lang === "ar";
  const [popUpInfoEmail, setPopUpInfoEmail] = useState({
    message: "",
    success: false,
  });

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [i18n]);
  const emailSubscription = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/email-subscription",
        { email: emailSub }
      );
      if (res.status === 200) {
        await axios.post("http://localhost:8000/api/mailing-list-email", {
          email: emailSub,
        });
      }
      setPopUpInfoEmail({ message: res.data.message, success: true });
      setEmailSub("");
    } catch (error) {
      setPopUpInfoEmail({
        message: error.response.data.message,
        success: false,
      });
    }
    setShowPopUpEmail(true);
    setTimeout(() => setShowPopUpEmail(false), 3000);
  };

  return (
    <>
      {showPopUpEmail && (
        <div
          className={`popup flex justify-between w-[280px] bg-[white] px-[1%] fixed right-[2%] top-[15%] z-[20] h-[100px]`}
        >
          <div className="h-[100%] w-[50%] justify-evenly items-center flex">
            <div className="flex justify-center items-center h-[100%]">
              {popUpInfoEmail.success ? (
                <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full text-white bg-[#676F98]">
                  <IoIosCheckmark className="text-[40px]" />
                </div>
              ) : (
                <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full text-white bg-[#FF6F6F]">
                  <AiOutlineClose className="text-[20px]" />
                </div>
              )}
            </div>
          </div>
          <div className="h-[100%] w-[60%] flex justify-center flex-col">
            <p className="text-left text-[12px]">{popUpInfoEmail.message}</p>
          </div>
        </div>
      )}
      <div className="bg-[#082252] border-[white] border-[1px] lg:w-[100%] font-[FahKwang] text-white flex justify-evenly flex-row lg:flex-col">
        <div
          className={`w-[65%] lg:w-[100%] xl:w-[100%] flex justify-center xl:justify-evenly gap-[2%] items-start lg:flex-col ${
            isArabic ? " text-[15px] text-right" : ""
          }`}
        >
          <div
            className={`w-[20%]  lg:px-[4%] lg:w-[100%] xl:w-[30%] flex justify-evenly items-start lg:flex-col ${
              isArabic ? " flex-row-reverse" : ""
            }`}
          >
            <div
              className={` lg:border-b-[1px] p-[5%] sm:h-[50px] lg:px-[0%] lg:w-[100%] border-[white] h-[20vh] xl:h-[25vh] lg:h-[5px] lg:border-r-[0px] ${
                isArabic ? "border-l-[2px] lg:border-l-[0px]" : "border-r-[2px]"
              }`}
            >
              <p className="lg:w-[100%] text-[#E79E7F]">
                {" "}
                {t("footer.about-title")}
              </p>
            </div>
            <div
              className={` pt-[5%] lg:p-[2%] lg:w-[100%] sm:py-[5%] lg:px-[0%] flex   flex-col ${
                isArabic ? " w-[50%]" : "items-start justify-center pl-[2%]"
              }`}
            >
              <Link to="/about-us" className="lg:w-[100%]  hover:font-[900]">
                {t("footer.aboutUs")}
              </Link>
              <Link to="/contact-us" className="lg:w-[100%]  hover:font-[900]">
                {t("footer.contactUs")}
              </Link>
            </div>
          </div>
          <div
            className={`w-[30%]  lg:px-[4%] lg:w-[100%] xl:w-[30%] flex justify-evenly items-start lg:flex-col ${
              isArabic ? " flex-row-reverse" : ""
            }`}
          >
            <div
              className={` lg:border-b-[1px] p-[5%] sm:h-[50px] lg:px-[0%] lg:w-[100%] border-[white] h-[20vh] xl:h-[25vh] lg:h-[5px] lg:border-r-[0px] ${
                isArabic ? "border-l-[2px] lg:border-l-[0px]" : "border-r-[2px]"
              }`}
            >
              <p className="text-[#E79E7F]"> {t("footer.customer-title")}</p>
            </div>
            <div
              className={` pt-[5%] lg:p-[2%] lg:w-[100%] sm:py-[5%] lg:px-[0%] flex   flex-col ${
                isArabic ? " w-[60%]" : "items-start justify-center pl-[2%]"
              }`}
            >
              <Link to="/shipping-policy" className="hover:font-[900]">
                {t("footer.shipping")}
              </Link>
              <Link to="/size-chart" className="hover:font-[900]">
                {t("footer.size")}
              </Link>
              <Link to="/payment-policy" className="hover:font-[900]">
                {t("footer.payment")}
              </Link>
              <Link to="/exchange-policy" className="hover:font-[900]">
                {t("footer.exchange")}
              </Link>
              <Link to="/privacy-policy" className="hover:font-[900]">
                {t("footer.privacy")}
              </Link>
              <Link to="/terms-policy" className="hover:font-[900]">
                {t("footer.terms")}
              </Link>
              <Link
                to="/frequently-asked-questions"
                className="hover:font-[900]"
              >
                {t("footer.faq")}
              </Link>
            </div>
          </div>
          <div
            className={`w-[20%]  lg:px-[4%] lg:w-[100%] xl:w-[30%] flex justify-evenly items-start lg:flex-col ${
              isArabic ? " flex-row-reverse" : ""
            }`}
          >
            <div
              className={` lg:border-b-[1px] p-[5%] sm:h-[50px] lg:px-[0%] lg:w-[100%] border-[white] h-[20vh] xl:h-[25vh] lg:h-[5px] lg:border-r-[0px] ${
                isArabic ? "border-l-[2px] lg:border-l-[0px]" : "border-r-[2px]"
              }`}
            >
              <p className="text-[#E79E7F]">{t("footer.follow-title")}</p>
            </div>
            <div
              className={` pt-[5%] lg:p-[2%] lg:w-[100%] sm:py-[5%] lg:px-[0%] flex   flex-col ${
                isArabic ? " w-[70%]" : "items-start justify-center pl-[2%]"
              }`}
            >
              <a
                href="https://www.facebook.com/CosmoLeb/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:font-[900]"
              >
                Facebook
              </a>

              <a
                href="https://www.instagram.com/cosmo.leb/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:font-[900]"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/channel/UCUShyAPOjFMBqt3jMHhCmmQ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:font-[900]"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-start  gap-[35%] lg:w-[100%] lg:px-[4%] items-start flex-col w-[35%] pl-[3%] xl:p-[1%] pt-[1%]">
          <div
            className={`w-[100%] flex flex-col ${
              isArabic ? " text-right text-[15px] px-[2%]" : ""
            }`}
          >
            <p className="pb-[1%]">{t("footer.subscribe")}</p>
            <form
              className={` flex w-[100%] text-[black] gap-[1%] lg:pb-[5%] md:pb-[10%] ${
                isArabic ? " flex-row-reverse" : ""
              }`}
              onSubmit={emailSubscription}
            >
              <input
                className={`w-[15vw] p-[2%] lg:w-[40%] md:w-[50%] xl:w-[20vw] sm:w-[80%] bg-[#dedede] rounded-[15px] h-[25px] flex justify-center items-center ${
                  isArabic ? "text-right" : ""
                }`}
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                placeholder={t("homePage.footer.placeholder")}
                required
              />
              <button
                type="submit"
                className="w-[4vw] hover:text-white xl:w-[5vw] lg:w-[10%] md:w-[20%] border-[1px] border-[black] bg-[#ef997b] p-[1%] rounded-[15px] h-[25px] flex justify-center items-center"
              >
                {t("homePage.footer.btn")}
              </button>
            </form>
          </div>
          <div className="sm:text-[12px] text-[12px] lg:pb-[2%]">
            <p> {t("homePage.footer.copyRights")}</p>
            <div className="flex items-center gap-[5%] h-[20px]">
              <p className="">SITEMANAGER V4.0</p>
              <a
                target="_blank"
                className="h-[10px] w-[85px]"
                href="http://www.in2info.com/"
              >
                <img
                  src={in2info}
                  className="w-[100%] h-[100%]"
                  alt="in2info-logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
