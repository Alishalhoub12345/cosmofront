import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { LuMapPin, LuPhone } from "react-icons/lu";

const StoreLocator = () => {
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

  // Get the translated stores array from JSON (must use returnObjects: true)
  const stores = t("storeLocator.stores", { returnObjects: true }) || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">

      <div
        className={`flex-1 px-[2%] lg:py-[2%] pt-[2%] font-[FrutigerLTCom-Roman] ${
          isArabic ? "text-right" : ""
        }`}
      >
        <h1 className="text-[24px] sm:text-[21px] md:text-[32px] lg:text-[40px] font-[FahKwang] px-[2%] mb-[3%]">
          {t("storeLocator.mainTitle")}
        </h1>

        <div className="flex flex-wrap justify-between gap-x-[2%] gap-y-10 px-[2%]">
          {stores.map((store, index) => (
            <div
              key={index}
              className="w-[48%] lg:w-[100%] p-[2%] bg-white rounded-[5px] flex flex-col justify-between shadow-md mb-[2%]"
            >
              <h2 className="text-[#082252] font-[FahKwang] font-[800] text-[16px] sm:text-[15px] md:text-[20px] mb-3">
                {store.name}
              </h2>

              <a
                href={store.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-[1%] mb-2 hover:underline ${
                  isArabic ? "flex-row-reverse" : ""
                }`}
              >
                <div className="flex justify-center bg-[#676F98] text-white rounded-full items-center w-[30px] h-[30px]">
                  <LuMapPin className="w-[20px] h-[20px]" />
                </div>
                <div className="text-[#3e3e3e] text-[14px] sm:text-[13px] md:text-[16px]">
                  <p>{store.address1}</p>
                  <p>{store.address2}</p>
                </div>
              </a>

              <div
                className={`flex items-center gap-[1%] mb-2 ${
                  isArabic ? "flex-row-reverse" : ""
                }`}
              >
                <div className="flex justify-center bg-[#676F98] text-white rounded-full items-center w-[30px] h-[30px]">
                  <LuPhone className="w-[27px] h-[20px]" />
                </div>
                <a
                  href={`tel:${store.phone}`}
                  className="text-[#E79E7F] hover:underline font-[FahKwang] font-[800] text-[14px] sm:text-[12px] md:text-[18px]"
                >
                  {store.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StoreLocator;
