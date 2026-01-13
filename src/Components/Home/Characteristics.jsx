import luxury from "../../images/Home/cosmo_website_icon4.png";
import designed from "../../images/Home/cosmo_website_icon5.png";
import shipping from "../../images/Home/cosmo_website_icon6.png";
import { useTranslation } from "react-i18next";

function Characteristics() {
  const { t, i18n } = useTranslation("global");
  const isArabic = i18n.language === "ar";

  return (
    <div className="h-auto w-full p-[5%] px-[15%] lg:px-[10%] text-[#082252]">
      <div
        className={`flex justify-evenly items-start ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* ITEM 1 */}
        <div className="w-[35%] h-full flex justify-center items-center flex-col gap-3">
          <img
            className="w-[200px] lg:w-[20vw] rounded-full"
            src={luxury}
            alt="luxury"
          />
          <p
            className={`text-[20px] leading-[1] font-[FrutigerLTCom-Roman] w-[60%] xl:w-[100%] lg:text-[2vw] text-center ${
              isArabic ? "text-[25px]" : ""
            }`}
          >
            {t("homePage.characteristics.luxury")}
          </p>
        </div>

        {/* ITEM 2 (MIDDLE – stays middle automatically) */}
        <div className="w-[35%] h-full flex justify-center items-center flex-col gap-3">
          <img
            className="w-[200px] lg:w-[20vw] rounded-full"
            src={designed}
            alt="designed"
          />
          <p
            className={`text-[20px] leading-[1] font-[FrutigerLTCom-Roman] w-[55%] xl:w-[100%] lg:text-[2vw] text-center ${
              isArabic ? "text-[25px]" : ""
            }`}
          >
            {t("homePage.characteristics.designed")}
          </p>
        </div>

        {/* ITEM 3 */}
        <div className="w-[35%] h-full flex justify-center items-center flex-col gap-3">
          <img
            className="w-[200px] lg:w-[20vw] rounded-full"
            src={shipping}
            alt="shipping"
          />
          <p
            className={`text-[20px] leading-[1] font-[FrutigerLTCom-Roman] w-[45%] xl:w-[80%] lg:text-[2vw] text-center ${
              isArabic ? "text-[25px] w-[50%]" : ""
            }`}
          >
            {t("homePage.characteristics.worldwide")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Characteristics;
