import axios from "axios";
import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { IoIosCheckmark } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import in2info from "../../images/logo1.png";
import { useTranslation } from "react-i18next";

function Footer() {
  const [emailSub, setEmailSub] = useState("");
  const [t, i18n] = useTranslation("global");
  const [showPopUpEmail, setShowPopUpEmail] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const isArabic = i18n.language === "ar";

  const [popUpInfoEmail, setPopUpInfoEmail] = useState({
    message: "",
    success: false,
  });
const emailSubscription = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://www.cosmo.global/laravel/api/mailing-list-email",
      { email: emailSub },
      {
        headers: { "Content-Type": "application/json" },
    
      }
    );

    // Any 2xx = success
    if (res.status >= 200 && res.status < 300) {
      const serverMsg =
        res.data?.message ||
        (typeof res.data === "string" ? res.data : null) ||
        "Subscription successful!";
      setPopUpInfoEmail({ message: serverMsg, success: true });
      setEmailSub("");
    } else {
      setPopUpInfoEmail({
        message: "Unexpected response from server.",
        success: false,
      });
    }
  } catch (error) {
    const status = error?.response?.status;
    // Laravel common cases
    if (status === 409) {
      setPopUpInfoEmail({
        message: "This email is already registered.",
        success: false,
      });
    } else if (status === 422) {
      const firstFieldError =
        error?.response?.data?.errors?.email?.[0] ||
        error?.response?.data?.message;
      setPopUpInfoEmail({
        message: firstFieldError || "Invalid email.",
        success: false,
      });
    } else {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (error?.message?.includes("Network") ? "Network error." : "Request failed.");
      setPopUpInfoEmail({ message: msg, success: false });
    }
  } finally {
    setShowPopUpEmail(true);
    setTimeout(() => setShowPopUpEmail(false), 3000);
  }
};



  return (
    <>
      {showPopUpEmail && (
        <div className="popup flex justify-between w-[280px] bg-white px-[1%] fixed right-[2%] top-[15%] z-[20] h-[100px] border-t-black">
          <div className="h-full w-[50%] justify-evenly items-center flex">
            <div className="flex justify-center items-center h-full">
              {popUpInfoEmail.success ? (
                <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full text-white bg-[#eeeeee]">
                  <IoIosCheckmark className="text-[40px]" />
                </div>
              ) : (
                <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full text-white bg-[#FF6F6F]">
                  <AiOutlineClose className="text-[20px]" />
                </div>
              )}
            </div>
          </div>
          <div className="h-full w-[60%] flex justify-center flex-col">
            <p className="text-left text-[12px]">{popUpInfoEmail.message}</p>
          </div>
        </div>
      )}

      <div className="bg-[#eeeeee]  border-[#082252] border-t-2 lg:w-full font-[FahKwang] text-[#082252] flex justify-evenly flex-row lg:flex-col">
        <div
          className={`w-[65%] lg:w-full xl:w-full flex justify-center xl:justify-evenly gap-[4%] items-start lg:flex-col ${
            isArabic ? "text-[15px] text-right" : ""
          }`}
        >
          {/* ABOUT */}
<div
  className={`w-[30%] lg:px-[0%] lg:w-full xl:w-[30%] flex items-start lg:flex-col ${
    isArabic ? "flex-row-reverse" : ""
  }`}
>
  <div
    className={`sm:pt-6 pb-[6%] pt-[4%] sm:h-[50px] lg:px-0 lg:w-full h-[20vh] xl:h-[25vh] lg:h-[5px] lg:border-r-0 gap-2 ${
      isArabic ? "pl-2" : "border-r-[0px] "
    }`}
  >
    <p className="text-[#082252] font-semibold sm:pb-0 sm:ml-3">{t("footer.about-title")}</p>
  </div>

  <div
    className={`sm:pt-2 pt-[4.5%] pl-[3%] pb-[1%] lg:w-full flex flex-col ${
      isArabic ? "pr-[3%]" : "pl-[1%] items-start justify-center"
    }`}
  >
    <Link to="/about-us" className="hover:font-[900] ">
      {t("footer.aboutUs")}
    </Link>
    <Link to="/contact-us" className="hover:font-[900]">
      {t("footer.contactUs")}
    </Link>
    <Link to="/store-locator" className="hover:font-[900]">
      {t("footer.storeLocator")}
    </Link>
  </div>
</div>


          {/* CUSTOMER */}
<div
  className={`w-[40%] lg:px-[0%] lg:w-full xl:w-[30%] flex items-start lg:flex-col ${
    isArabic ? "flex-row-reverse" : ""
  }`}
>
  <div
    className={`sm:pt-6 pb-[6%] pt-[3%] sm:h-[50px] lg:px-0 lg:w-full h-[20vh] xl:h-[25vh] lg:h-[5px] lg:border-r-0 gap-2 ${
      isArabic ? "pl-2" : "border-r-[0px] "
    }`}
  >
    <p className="text-[#082252] font-semibold sm:pb-0 sm:ml-3">{t("footer.customer-title")}</p>
  </div>
            <div
              className={`pt-[3%] sm:pt-2 pl-[3%] pb-[1%] lg:w-full flex flex-col ${
                isArabic ? "pr-[3%]" : "pl-[1%] items-start justify-center"
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
              <Link to="/frequently-asked-questions" className="hover:font-[900]">
                {t("footer.faq")}
              </Link>
            </div>
          </div>

          {/* FOLLOW US */}
<div
  className={`w-[20%] lg:px-[0%] lg:w-full xl:w-[30%] flex items-start lg:flex-col ${
    isArabic ? "flex-row-reverse" : ""
  }`}
>
  <div
    className={`sm:pt-6 pb-[6%] pt-[4%] sm:h-[50px] lg:px-0 lg:w-full h-[20vh] xl:h-[25vh] lg:h-[5px] lg:border-r-0 gap-2 ${
      isArabic ? "pl-2" : "border-r-[0px] "
    }`}
  >
    <p className="text-[#082252] font-semibold sm:pb-0 sm:ml-3">{t("footer.follow-title")}</p>
  </div>
            <div
              className={`sm:pt-2 pt-[4%] pb-[1%] pl-[5%] lg:w-full flex flex-col ${
                isArabic ? "pr-[3%] text-[13px]" : "pl-[0%] items-start justify-center"
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
                href="https://www.instagram.com/cosmo.glob/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:font-[900]"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@Cosmo.Global"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:font-[900]"
              >
                YouTube
              </a>                
              <a
                href="https://www.tiktok.com/@cosmo.glob"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:font-[900]"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* SUBSCRIBE + COPYRIGHT */}
        <div className="flex justify-center gap-[35%] lg:w-full lg:px-[4%] items-start flex-col w-[35%] pl-[3%] xl:p-[1%] pt-[1%] sm:mt-5">
          <div
            className={`w-full flex flex-col ${
              isArabic ? "text-[15px] px-[2%] flex text-left " : ""
            }`}
          >
            <p className="pb-[1%]">{t("footer.subscribe")}</p>
            <form
              className={`flex w-full text-black gap-[1%] lg:pb-[5%] md:pb-[10%] ${
                isArabic ? "flex-row-reverse justify-end" : ""
              }`}
              onSubmit={emailSubscription}
            >
              <input
                className={`w-[15vw] p-[2%] lg:w-[40%] md:w-[50%] xl:w-[20vw] sm:w-[80%] bg-[#dedede] rounded-[3px] h-[25px] ${
                  isArabic ? "text-right" : ""
                }`}
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                placeholder={t("homePage.footer.placeholder")}
                required
              />
              <button
                type="submit"
                className="w-[4vw] hover:bg-[#082252] hover:text-[#eeeeee] xl:w-[5vw] lg:w-[10%] md:w-[20%] border border-[#082252] bg-[#eeeeee] p-[1%] rounded-[3px] h-[25px] flex justify-center items-center"
              >
                {t("homePage.footer.btn")}
              </button>
            </form>
          </div>
<div
  className={`flex-col lg:pb-[2%] text-[12px] ${
    isArabic ? "text-[12px] ml-4 sm:ml-0" : ""
  }`}
>
            <p>{t("homePage.footer.copyRights")}</p>
            <div className="flex items-center gap-[5%] h-[20px]">
              <p>SITEMANAGER V4.0</p>
              <a
                target="_blank"
                className="h-[13px] w-[85px]"
                href="http://www.in2info.com/"
              >
                <img
                  src={in2info}
                  className="w-full h-full"
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
