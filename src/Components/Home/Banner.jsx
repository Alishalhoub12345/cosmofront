import { useEffect } from "react";
import parrot from "../../images/Home/parrot peach.png"
import { useTranslation } from "react-i18next";
import banner from "../../images/Home/JK-Catena-Blk-banner.jpg"

function Banner() {
  const [t, i18n] = useTranslation("global");
  const isArabic = localStorage.getItem("lang") === "ar";

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [i18n]);

  

  return (
    <div className=''>
        <div className="w-[99.9%] h-[80vh] lg:h-[50vh] md:h-[30vh]">
            {/* <video className="w-[100%] border-[1px] h-[100%] object-cover" src={cosmovid} autoPlay loop muted type="video/mp4"></video> */}
            <img className="w-[100%]  h-[100%] object-cover" alt="banner"  src={banner}/>
        </div>
        <div className="flex justify-center items-center w-[100%] flex-col py-[2%]">
            <img src={parrot} className="w-[190px] md:w-[140px] sm:w-[100px]" alt="parrot-icon"></img>
            <p className={`text-[20px] font-[ FrutigerLTCom-Roman] w-[40%] text-center pb-[5%] lg:pb-[10%] xl:w-[80%] md:text-[18px] md:w-[90%] sm:text-[15px] ${isArabic?"text-[25px]":""}`}>
            {t("homePage.ourBrands")}</p>
        </div>
    </div>
  )
}

export default Banner