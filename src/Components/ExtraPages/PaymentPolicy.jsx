import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function PaymentPolicy() {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
      setLang(selectedLang);
    }
  }, [i18n]);

  const isArabic = lang === "ar";

  return (
    <div
      className={`text-[#082252] w-[100%] px-[5%] h-[auto] lg:py-[2%] pt-[2%] font-[FrutigerLTCom-Roman] ${
        isArabic ? " text-right" : ""
      }`}
    >
      <div className="px-[2%]">
        <h1
          className={`text-[40px] font-[FahKwang] lg:text-[40px] md:text-[23px] ${
            isArabic ? "text-[30px] w-[100%]" : ""
          }`}
        >
          {t("paymentPolicyPage.mainTitle")}
        </h1>
        <div className="text-[16px] h-[auto]">
          <div
            className={`h-[auto] flex ${
              isArabic ? "justify-end" : "justify-evenly"
            } flex-col text-[15px]`}
          >
            <div className="pt-[2%]">
              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:py-[5%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }`}
              >
                <strong>{t("paymentPolicyPage.section1.title")}</strong>
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
              >
                {t("paymentPolicyPage.section1.sec1p1")}
              </p>
              <p
                className={` xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
              >
                {t("paymentPolicyPage.section1.sec1p2")}
              </p>
              <p
                className={` xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
              >
                {t("paymentPolicyPage.section1.sec1p3")}
              </p>
              <p
                className={` xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
              >
                {t("paymentPolicyPage.section1.sec1p4")}
              </p>
            </div>

            <div className="py-[2%]">
              <p
                className={`font-[FahKwang] text-[20px] pt-[2%] md:py-[5%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }`}
              >
                <strong>{t("paymentPolicyPage.section2.title")}</strong>
              </p>
              <p
                className={`mt-[1%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }`}
              >
                <strong>{t("paymentPolicyPage.section2.COD.title")}</strong>
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
              >
                {t("paymentPolicyPage.section2.COD.sec2p1")}
              </p>

              <p
                className={`mt-[1%] md:mt-[5%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }`}
              >
                <strong>
                  {t("paymentPolicyPage.section2.DebitCard.title")}
                </strong>
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
              >
                {t("paymentPolicyPage.section2.DebitCard.sec2p1")}
              </p>

              <p
                className={` xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
                dangerouslySetInnerHTML={{
                  __html: t("paymentPolicyPage.section2.DebitCard.sec2p2"),
                }}
              />

              <p
                className={`pt-[1%]  xl:w-[100%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
                dangerouslySetInnerHTML={{
                  __html: t("paymentPolicyPage.section2.DebitCard.sec2p3"),
                }}
              />

              <p
                className={`pt-[1%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: t("paymentPolicyPage.section2.DebitCard.sec2p4"),
                }}
              />
              <p
                className={
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }
              >
                {t("paymentPolicyPage.section2.DebitCard.sec2p5")}
              </p>

              <p
                className={`mt-[1%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }`}
              >
                {t("paymentPolicyPage.section2.DebitCard.sec2p6")}{" "}
              </p>

              <p
                className={
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }
              >
                {t("paymentPolicyPage.section2.DebitCard.sec2p7")}
              </p>
              <p
                className={`mt-[1%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }`}
              >
                {t("paymentPolicyPage.section2.DebitCard.sec2p8")}
              </p>

              <p
                className={
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }
                dangerouslySetInnerHTML={{
                  __html: t("paymentPolicyPage.section2.DebitCard.sec2p9"),
                }}
              />

              <p
                className={`mt-[1%] md:mt-[5%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : ""
                }`}
              >
                <strong>
                  {t("paymentPolicyPage.section2.WireTransfer.title")}
                </strong>
              </p>
              <p
                className={` xl:w-[100%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
                dangerouslySetInnerHTML={{
                  __html: t("paymentPolicyPage.section2.WireTransfer.sec3p1"),
                }}
              />

              <p
                className={` xl:w-[100%] mt-[1%] ${
                  isArabic
                    ? "text-[20px] w-[100%]"
                    : "w-[55%]"
                }`}
                dangerouslySetInnerHTML={{
                  __html: t("paymentPolicyPage.section2.WireTransfer.sec3p2"),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPolicy;
