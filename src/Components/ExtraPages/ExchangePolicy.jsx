import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ExchangePolicy() {
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [i18n]);

  const isArabic = localStorage.getItem("lang") === "ar";

  return (
    <div
      className={`w-[100%] h-[80vh] px-[5%] lg:h-[auto] lg:py-[2%] pt-[2%] font-[FrutigerLTCom-Roman] ${
        isArabic ? " text-right w-[100%] text-[20px] lg:text-[15px]" : ""
      }`}
    >
      <div className="px-[2%] ">
        <h1
          className={`text-[40px] font-[FahKwang] lg:text-[40px] md:text-[25px] md:py-[5%] ${
            isArabic ? " text-right w-[100%] text-[20px] lg:text-[15px]" : ""
          }`}
        >
          {t("exchangePolicy.titleMain")}
        </h1>
        <div
          className={`text-[15px] py-[1%]  xl:w-[100%] ${
            isArabic
              ? " text-right w-[100%] text-[20px] lg:text-[15px]"
              : "w-[80%]"
          }`}
        >
          <p
            className={` xl:w-[100%] ${
              isArabic
                ? " text-right w-[100%] text-[20px] lg:text-[15px]"
                : "w-[46vw]"
            }`}
          >
            {t("exchangePolicy.p1")}
          </p>
          <p
            className={
              isArabic ? " text-right w-[100%] text-[20px] lg:text-[15px]" : ""
            }
          >
            {t("exchangePolicy.p2")}
          </p>
          <p
            className={
              isArabic ? " text-right w-[100%] text-[20px] lg:text-[15px]" : ""
            }
            dangerouslySetInnerHTML={{ __html: t("exchangePolicy.p3") }}
          />
          <p
            className={` xl:w-[100%] ${
              isArabic
                ? " text-right w-[100%] text-[20px] lg:text-[15px]"
                : "w-[47vw]"
            }`}
            dangerouslySetInnerHTML={{ __html: t("exchangePolicy.p4") }}
          />
          <p
            className={
              isArabic ? " text-right w-[100%] text-[20px] lg:text-[15px]" : ""
            }
          >
            {t("exchangePolicy.p5")}
          </p>
        </div>
        <div
          className={`h-[auto] flex justify-evenly flex-col text-[15px] ${
            isArabic ? " text-right w-[100%] text-[20px] lg:text-[15px]" : ""
          }`}
        >
          <div
            className={` xl:w-[100%] pt-[2%] ${
              isArabic ? "w-[100%]" : "w-[45vw]"
            }`}
          >
            <p
              className={`md:py-[5%] ${
                isArabic
                  ? " text-right w-[100%] text-[20px] lg:text-[15px]"
                  : ""
              }`}
            >
              <strong>{t("exchangePolicy.section1.section1Title")}</strong>
            </p>
            <p
              className={
                isArabic
                  ? " text-right w-[100%] text-[20px] lg:text-[15px]"
                  : ""
              }
            >
              {t("exchangePolicy.section1.sec1p1")}
            </p>
          </div>
          <div className="pt-[2%]">
            <p
              className={`md:py-[5%] ${
                isArabic
                  ? " text-right w-[100%] text-[20px] lg:text-[15px]"
                  : ""
              }`}
            >
              <strong>{t("exchangePolicy.section2.section2Title")}</strong>
            </p>
            <p
              className={` xl:w-[100%] ${
                isArabic
                  ? " text-right w-[100%] text-[20px] lg:text-[15px] "
                  : "w-[45vw]"
              }`}
            >
              {t("exchangePolicy.section2.sec2p1")}
            </p>
            <p
              className={`xl:w-[100%] ${
                isArabic
                  ? " text-right w-[100%] text-[20px] lg:text-[15px]"
                  : "w-[46vw] "
              }`}
            >
              {t("exchangePolicy.section2.sec2p2")}
            </p>
            <p
              className={` xl:w-[100%] ${
                isArabic
                  ? " text-right w-[100%] text-[20px] lg:text-[15px]"
                  : "w-[45vw]"
              }`}
              dangerouslySetInnerHTML={{
                __html: t("exchangePolicy.section2.sec2p3"),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangePolicy;
