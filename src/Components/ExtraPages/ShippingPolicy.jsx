import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ShippingPolicy() {
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
      className={`w-[100%] px-[5%] h-[auto] lg:py-[2%] pt-[2%] md:pt-[5%] font-[FrutigerLTCom-Roman] text-[#082252]${
        isArabic
          ? " text-[20px] lg:text-[15px] w-[100%] text-right"
          : ""
      }`}
    >
      <div className="px-[2%]">
        <h1
          className={`text-[40px] font-[FahKwang] lg:text-[40px] md:text-[23px] ${
            isArabic
              ? " text-[20px] lg:text-[15px] w-[100%] text-right"
              : ""
          }`}
        >
          {t("shipping.titleMain")}
        </h1>
        <div className="text-[16px] h-[auto]">
          <p
            className={
              isArabic
                ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                : ""
            }
          >
            {t("shipping.title")}
          </p>
          <p
            className={
              isArabic
                ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                : ""
            }
            dangerouslySetInnerHTML={{ __html: t("shipping.p1") }}
          />
          <div
            className={`border-[1px] flex mt-[1%] border-[#d0d0d0] w-[100%] h-[150px] md:mt-[5%] ${
              isArabic ? "justify-end" : ""
            }`}
          >
            <div
              className={` md:text-[13px] flex justify-evenly flex-col ${
                isArabic
                  ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                  : "w-[33.33%]"
              }`}
            >
              <p
                className={`px-[3%] border-b-[1px] border-[#d0d0d0] flex justify-start items-center h-[40px] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right justify-end"
                    : ""
                }`}
              >
                <strong>{t("shipping.shipmentMethod")}</strong>
              </p>
              <p
                className={`flex px-[3%] justify-start items-center h-[40px] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right justify-end"
                    : ""
                }`}
              >
                {t("shipping.leb")}
              </p>
              <p
                className={`flex px-[3%] justify-start items-center h-[40px] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right justify-end"
                    : ""
                }`}
              >
                {t("shipping.international")}
              </p>
            </div>
            <div
              className={` flex justify-evenly flex-col md:text-[13px] border-x-[1px] border-[#d0d0d0] ${
                isArabic
                  ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                  : "w-[33.33%]"
              }`}
            >
              <p
                className={`px-[3%] border-b-[1px] border-[#d0d0d0] flex justify-start items-center h-[40px] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right justify-end"
                    : ""
                }`}
              >
                <strong>{t("shipping.estimated")}</strong>
              </p>
              <p
                className={`flex px-[3%] justify-start items-center h-[40px] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right justify-end"
                    : ""
                }`}
              >
                {t("shipping.lebDays")}
              </p>
              <p
                className={`flex px-[3%] justify-start items-center h-[40px] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right justify-end"
                    : ""
                }`}
              >
                {t("shipping.intDays")}
              </p>
            </div>
            <div
              className={`flex justify-evenly flex-col md:text-[13px] ${
                isArabic
                  ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                  : "w-[33.33%] "
              }`}
            >
              <p
                className={`px-[3%] border-b-[1px] border-[#d0d0d0] flex justify-start items-center h-[40px] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right  justify-end"
                    : ""
                }`}
              >
                <strong> {t("shipping.cost")}</strong>
              </p>
              <p
                className={`flex px-[3%] justify-start items-center h-[40px] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right justify-end"
                    : ""
                }`}
              >
                {t("shipping.costLeb")}
              </p>
              <p
                className={`flex px-[3%] justify-start items-center h-[40px] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right justify-end"
                    : ""
                }`}
              >
                {t("shipping.costInt")}
              </p>
            </div>
          </div>
          <div
            className={`h-[auto] flex justify-evenly flex-col text-[15px] ${
              isArabic
                ? " text-[20px] lg:text-[15px] w-[100%] text-right justify-end"
                : ""
            }`}
          >
            <div
              className={` xl:w-[100%] pt-[2%] md:pt-[5%] ${
                isArabic ? "w-[100%]" : "w-[45vw]"
              }`}
            >
              <p
                className={`md:pt-[10%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }`}
              >
                <strong>{t("shipping.lebanonOrder.title")}</strong>
              </p>
              <p
                className={
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }
              >
                {t("shipping.lebanonOrder.desc")}
              </p>
            </div>
            <div className="pt-[2%]">
              <p
                className={`md:pt-[10%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }`}
              >
                <strong>{t("shipping.intOrder.title")}</strong>
              </p>
              <p
                className={`font-[FahKwang] text-[20px] lg:text-[15px] pt-[2%] md:pt-[5%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }`}
              >
                <strong>{t("shipping.intOrder.section1Title")}</strong>
              </p>
              <p
                className={` lg:w-[100%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : "w-[55%]"
                }`}
              >
                {t("shipping.intOrder.sec1p1")}
              </p>
              <p
                className={` lg:w-[100%] mt-[1%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : "w-[55%]"
                }`}
              >
                {t("shipping.intOrder.sec1p2")}
              </p>
              <p
                className={
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }
              >
                {t("shipping.intOrder.sec1p3")}{" "}
<a
  href="https://www.thenet.group/track"
  target="_blank"
  rel="noopener noreferrer"
  className={`underline underline-offset-2 cursor-pointer hover:font-semibold ${
    isArabic ? "text-[20px] lg:text-[15px] w-[100%] text-right" : ""
  }`}
>
  www.thenet.group/track
</a>
              </p>
              <p
                className={
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }
              >
                {t("shipping.intOrder.sec1p4")}
              </p>
              <p
                className={
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }
              >
                {t("shipping.intOrder.sec1p5")}
              </p>
              <p
                className={`mt-[1%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }`}
              >
                {t("shipping.intOrder.sec1p6")}
              </p>
              <p
                className={
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }
              >
                {t("shipping.intOrder.sec1p7")}
              </p>
              <p
                className={`mt-[1%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }`}
              >
                {t("shipping.intOrder.sec1p8")}
              </p>
              <p
                className={
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }
              >
                {t("shipping.intOrder.sec1p9")}
              </p>
            </div>
            <div className="pt-[2%]">
              <p
                className={`font-[FahKwang] text-[20px] lg:text-[15px] md:pt-[5%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }`}
              >
                <strong>{t("shipping.intOrder.section2Title")}</strong>
              </p>
              <p
                className={`lg:w-[100%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : "w-[55%] "
                }`}
              >
                {t("shipping.intOrder.sec2p1")}
              </p>
              <p
                className={`lg:w-[100%] mt-[1%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : "w-[55%] "
                }`}
              >
                {t("shipping.intOrder.sec2p2")}
              </p>
              <p
                className={`mt-[1%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }`}
              >
                {t("shipping.intOrder.sec2p3")}
              </p>
            </div>
            <div className="pt-[2%]">
              <p
                className={`font-[FahKwang] text-[20px] lg:text-[15px] md:pt-[5%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : ""
                }`}
              >
                <strong>{t("shipping.intOrder.section3Title")}</strong>
              </p>
              <p
                className={` lg:w-[100%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : "w-[55%]"
                }`}
                dangerouslySetInnerHTML={{
                  __html: t("shipping.intOrder.sec3p1"),
                }}
              />
              <p
                className={` lg:w-[100%] mt-[1%] pb-[5%] ${
                  isArabic
                    ? " text-[20px] lg:text-[15px] w-[100%] text-right"
                    : "w-[55%]"
                }`}
              >
                {t("shipping.intOrder.sec3p2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;
