import React from 'react'
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';

function PrivacyPolicy() {
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
   const selectedLang = localStorage.getItem("lang");
   if (selectedLang) {
     i18n.changeLanguage(selectedLang);
   }
 }, [i18n]);

  const isArabic = localStorage.getItem("lang") === "ar";
  return (
    <div className="w-[100%] px-[0%] h-[auto] lg:py-[2%] pt-[0%] font-[FrutigerLTCom-Roman]">
      <div
  className={`w-full px-[5%] lg:py-[2%] pt-[2%] font-[FrutigerLTCom-Roman] ${
    isArabic ? "text-right" : "text-left"
  }`}
  dir={isArabic ? "rtl" : "ltr"}
>
      <div className=" px-[2%]">
        <h1 className="text-[40px] font-[FahKwang]  lg:text-[40px] md:text-[23px]">
          {t("privacyPolicy.titleMain")}
        </h1>
        <div className=" text-[16px] h-[auto] ">
          <div className=" h-[auto] flex justify-evenly flex-col  text-[15px]">
            <div className="pt-[2%]">
              <p
                className={` xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[55%]"
                }`}
              >
                <strong className='font-[FahKwang] text-[20px]'>{t("privacyPolicy.p1")}</strong>
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[55%]"
                }`}
              >
                {t("privacyPolicy.p2")}{" "}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >                {t("privacyPolicy.p3")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.p4")}
              </p>
            </div>

            <div className="pt-[2%]">
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[55%]"
                }`}
              >
                {t("privacyPolicy.p5")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.p6")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >                {t("privacyPolicy.p7")}
              </p>
            </div>

            <div className="py-[2%]">
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[25px]"
                    : "w-[80%]"
                }`}
              >  
              <strong className='font-[FahKwang] text-[20px]'>{t("privacyPolicy.Intro.title")} </strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Intro.p1")}
              </p>

              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%] pt-6"
                }`}
              >   
              <strong className='font-[FahKwang] text-[20px]'>{t("privacyPolicy.infoCollected.title")}</strong>
              </p>
              <div className='flex-col space-y-3'>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.infoCollected.p1")}
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.infoCollected.p2")}
              </p>
              <p
                className={`xl:w-[100%]  ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.infoCollected.p3")}
              </p>
              <p
                className={`xl:w-[100%]  ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.infoCollected.p4")}
              </p>
              <p
                className={`xl:w-[100%]  ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.infoCollected.p5")}
              </p>
              <p
                className={`xl:w-[100%]  ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.infoCollected.p6")}
              </p>
              <p
                className={`xl:w-[100%]  ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.infoCollected.p7")}
              </p>
              <p
                className={`xl:w-[100%]  ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.infoCollected.p8")}
              </p>

              <p
                className={`xl:w-[100%]  ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.infoCollected.p9")}
              </p>
  </div>    
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%] pt-6"
                }`}
              >
                       
              <strong className='font-[FahKwang] text-[20px]'> {t("privacyPolicy.otherSourceInfo.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.otherSourceInfo.p1")}
              </p>

              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%] pt-6"
                }`}
              >                <strong className='font-[FahKwang] text-[20px]'> {t("privacyPolicy.Cookies.title")}</strong>
              </p>
                            <div className='flex-col space-y-3'>

              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p1")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p2")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p3")}
              </p>

              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p4")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p5")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p6")}
              </p>

              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p7")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p8")}
              </p>

              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p9")}
              </p>

              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p10")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p11")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.Cookies.p12")}
              </p>
</div>
              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%] pb-3">
                <strong className='text-[20px]'>{t("privacyPolicy.ThirdParty.title")}</strong>
              </p>
                            <div className='flex-col space-y-3'>

              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.ThirdParty.p1")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.ThirdParty.p2")}
              </p>
</div>
              <p className="font-[FahKwang] text-[20px] pb-3 pt-[2%] md:pt-[10%]">
                <strong className='text-[20px]'> {t("privacyPolicy.useOfInfo.title")}</strong>
              </p>
                            <div className='flex-col space-y-3'>

              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p1")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p2")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p3")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p4")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p5")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p6")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p7")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p8")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p9")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p10")}
              </p>
              <p className="w-[80%] py-[1%] xl:w-[100%]">
                {t("privacyPolicy.useOfInfo.p11")}
              </p>
              <p
                className={`xl:w-[100%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.useOfInfo.p12")}
              </p>
              </div>
              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong className='text-[20px]'>{t("privacyPolicy.businessTrnasfer.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.businessTrnasfer.p1")}
              </p>

              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong>{t("privacyPolicy.storingInfo.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.storingInfo.p1")}
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.storingInfo.p2")}
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.storingInfo.p3")}
              </p>

              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong>{t("privacyPolicy.sharingInfo.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.sharingInfo.p1")}
              </p>

              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong> {t("privacyPolicy.secureInfo.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.secureInfo.p1")}
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.secureInfo.p2")}
              </p>

              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong>{t("privacyPolicy.transferInfo.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.transferInfo.p1")}
              </p>

              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong>{t("privacyPolicy.links.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.links.p1")}
              </p>

              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong>{t("privacyPolicy.access.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.access.p1")}
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.access.p2")}
              </p>

              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong>{t("privacyPolicy.yourChoice.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.yourChoice.p1")}
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.yourChoice.p2")}
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.yourChoice.p3")}
              </p>

              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong>{t("privacyPolicy.logalDisputes.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.logalDisputes.p1")}
              </p>

              <p className="font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%]">
                <strong>{t("privacyPolicy.law.title")}</strong>
              </p>
              <p
                className={`xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "w-[100%] text-right text-[20px] lg:text-[15px]"
                    : "w-[80%]"
                }`}
              >
                {t("privacyPolicy.law.p1")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PrivacyPolicy