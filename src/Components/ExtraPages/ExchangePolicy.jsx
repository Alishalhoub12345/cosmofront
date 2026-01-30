import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ExchangePolicy() {
  const { t, i18n } = useTranslation("global");

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [i18n]);

  const isArabic = i18n.language === "ar";

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`text-[#082252] w-full min-h-[80vh] px-[5%] pt-[2%] font-[FrutigerLTCom-Roman] lg:py-[2%] ${
        isArabic ? "text-right text-[20px] lg:text-[15px]" : ""
      }`}
    >
      <div className="px-[2%]">
        {/* TITLE */}
        <h1 className="text-[40px] font-[FahKwang] md:text-[25px] md:py-[5%]">
          {t("exchangePolicy.titleMain")}
        </h1>

        {/* INTRO */}
        <div className={`text-[15px] py-[1%] ${isArabic ? "" : "w-[80%]"}`}>
          <p className={`${isArabic ? "" : "w-[46vw]"}`}>
            {t("exchangePolicy.p1")}
          </p>

          <p>{t("exchangePolicy.p2")}</p>

          <p
            dangerouslySetInnerHTML={{ __html: t("exchangePolicy.p3") }}
          />

          <p
            className={`${isArabic ? "" : "w-[47vw]"}`}
            dangerouslySetInnerHTML={{ __html: t("exchangePolicy.p4") }}
          />

          <p>{t("exchangePolicy.p5")}</p>
        </div>

        {/* SECTIONS */}
        <div className="flex flex-col text-[15px]">
          {/* SECTION 1 */}
          <div className={`${isArabic ? "" : "w-[45vw]"} pt-[2%]`}>
            <p className="md:py-[5%]">
              <strong>{t("exchangePolicy.section1.section1Title")}</strong>
            </p>
            <p>{t("exchangePolicy.section1.sec1p1")}</p>
          </div>

          {/* SECTION 2 */}
          <div className="pt-[2%]">
            <p className="md:py-[5%]">
              <strong>{t("exchangePolicy.section2.section2Title")}</strong>
            </p>

            <p className={`${isArabic ? "" : "w-[45vw]"}`}>
              {t("exchangePolicy.section2.sec2p1")}
            </p>

            <p className={`${isArabic ? "" : "w-[46vw]"}`}>
              {t("exchangePolicy.section2.sec2p2")}
            </p>

            <p
              className={`${isArabic ? "" : "w-[45vw]"}`}
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
