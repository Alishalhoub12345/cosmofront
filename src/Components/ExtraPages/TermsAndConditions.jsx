import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function TermsAndConditions() {
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
      className={`w-[100%] px-[5%] h-[auto] lg:py-[2%] pt-[2%] font-[FrutigerLTCom-Roman] ${
        isArabic ? " text-[20px] lg:text-[15px] text-right" : ""
      }`}
    >
      <div className="px-[2%]">
        <h1
          className={`text-[40px] font-[FahKwang] lg:text-[40px] md:text-[23px] ${
            isArabic ? " text-[20px] lg:text-[15px] " : ""
          }`}
        >
          {t("terms.title")}
        </h1>
        <div
          className={`text-[16px] h-[auto] ${
            isArabic
              ? " text-[20px] lg:text-[15px] text-right w-[100%]"
              : ""
          }`}
        >
          <div
            className={`h-[auto] flex justify-evenly flex-col text-[15px] ${
              isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : ""
            }`}
          >
            <div className="pt-[2%]">
              <p
                className={` xl:w-[100%] mt-[1%] ${
                  isArabic ? " text-[20px] lg:text-[15px]" : "w-[55%]"
                }`}
              >
                {t("terms.p1")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[55%]"
                }`}
              >
                {t("terms.p2")}
              </p>
              <p className={isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : ""}>{t("terms.p3")}</p>
              <p className={isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : ""}>{t("terms.p4")}</p>
            </div>

            <div className="py-[2%]">
              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%] ${
                  isArabic ? " text-[20px] lg:text-[15px]" : ""
                }`}
              >
                <strong>{t("terms.eligibility.title")}</strong>
              </p>
              <p
                className={` mt-[1%] xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.eligibility.p1")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.eligibility.p2")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.eligibility.p3")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.eligibility.p4")}
              </p>

              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%] ${
                  isArabic ? " text-[20px] lg:text-[15px]" : ""
                }`}
              >
                <strong>{t("terms.payments.title")}</strong>
              </p>
              <p
                className={` mt-[1%] xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.payments.p1")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.payments.p2")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.payments.p3")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.payments.p4")}
              </p>

              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%] ${
                  isArabic ? " text-[20px] lg:text-[15px]" : ""
                }`}
              >
                <strong>{t("terms.changes.title")}</strong>
              </p>
              <p
                className={` mt-[1%] xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.changes.p1")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.changes.p2")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.changes.p3")}
              </p>

              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%] ${
                  isArabic ? " text-[20px] lg:text-[15px]" : ""
                }`}
              >
                <strong>{t("terms.unauthorized.title")}</strong>
              </p>
              <p
                className={` mt-[1%] xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.unauthorized.p1")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.unauthorized.p2")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.unauthorized.p3")}
              </p>

              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%] ${
                  isArabic ? " text-[20px] lg:text-[15px]" : ""
                }`}
              >
                <strong>{t("terms.internet.title")}</strong>
              </p>
              <p
                className={` mt-[1%] xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.internet.p1")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.internet.p2")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.internet.p3")}
              </p>

              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%] ${
                  isArabic ? " text-[20px] lg:text-[15px]" : ""
                }`}
              >
                <strong>{t("terms.term.title")}</strong>
              </p>
              <p
                className={` mt-[1%] xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.term.p1")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.term.p2")}
              </p>

              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%] ${
                  isArabic ? " text-[20px] lg:text-[15px]" : ""
                }`}
              >
                <strong>{t("terms.rights.title")}</strong>
              </p>
              <p
                className={` mt-[1%] xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.rights.p1")}
              </p>

              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:pt-[10%] ${
                  isArabic ? " text-[20px] lg:text-[15px]" : ""
                }`}
              >
                <strong>{t("terms.internationalUsers.title")}</strong>
              </p>
              <p
                className={` mt-[1%] xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.internationalUsers.p1")}
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic ? " text-[20px] lg:text-[15px] w-[100%]" : "w-[80%]"
                }`}
              >
                {t("terms.internationalUsers.p2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
