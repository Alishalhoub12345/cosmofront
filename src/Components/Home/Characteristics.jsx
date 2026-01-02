import { useEffect } from "react";
import luxury from "../../images/Home/cosmo_website_icon4.png"
import designed from "../../images/Home/cosmo_website_icon5.png"
import shipping from "../../images/Home/cosmo_website_icon6.png"
import { useTranslation } from "react-i18next";

function Characteristics() {

    const [t, i18n] = useTranslation("global");
    const isArabic = localStorage.getItem("lang") === "ar";
  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [i18n]);
  
  return (
    <div className="h-[auto] w-[100%] p-[5%] px-[15%] lg:px-[10%] text-[#082252] ">
        <div className="flex justify-evenly items-start">
            <div className=" w-[35%] h-[100%] flex justify-center items-center flex-col">
            <img className="w-[200px] lg:w-[20vw]" src={luxury} alt="icon-1"></img>
            <p className={`text-[20px] leading-[1] font-[FrutigerLTCom-Roman] w-[60%] xl:w-[100%] lg:text-[2vw] text-center ${isArabic?"text-[25px]":""}`}> {t("homePage.characteristics.luxury")}</p>
            </div>
           
            <div className=" w-[35%]  h-[100%] flex justify-center items-center flex-col">
            <img className=" w-[200px] lg:w-[20vw] " src={designed} alt="icon-2"></img>
            <p className={`text-[20px] leading-[1] font-[FrutigerLTCom-Roman] w-[55%]  xl:w-[100%] lg:text-[2vw] text-center ${isArabic?"text-[25px]":""}`}> {t("homePage.characteristics.designed")}</p>
            </div>
            <div className="  w-[35%] flex justify-center items-center flex-col">
            <img className="w-[200px] lg:w-[20vw]" src={shipping} alt="icon-3"></img>
            <p className={`text-[20px] leading-[1] font-[FrutigerLTCom-Roman] w-[45%] xl:w-[80%]  lg:text-[2vw] text-center ${isArabic?"text-[25px] w-[50%]":""}`}> {t("homePage.characteristics.worldwide")}</p>

            </div>

        </div>

    </div>
  )
}

export default Characteristics