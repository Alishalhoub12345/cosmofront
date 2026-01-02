import React, { useEffect, useState } from "react";
import { LuPhone } from "react-icons/lu";
import { AiOutlineMail } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function ContactUs() {
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
      className={`w-full text-[#082252] h-[80vh] px-[5%] lg:h-auto lg:py-[2%] pt-[2%] font-[FrutigerLTCom-Roman] ${
        isArabic ? "text-right" : ""
      }`}
    >
      <h1 className="text-[40px] font-[FahKwang] px-[2%] lg:text-[40px] md:text-[25px]">
        {t("cotactUs.mainTitle")}
      </h1>

      <div className="mt-[2%] flex px-[2%] h-[350px] lg:flex-wrap justify-between gap-[2%]">
        {/* CALL US */}
        <div className="w-[55%] lg:w-full">
          <div className="p-[4%] rounded-[5px] bg-white h-[180px] lg:h-[150px] flex flex-col justify-between gap-[4%] group">
            <div
              className={`flex gap-[1%] items-center transition-colors ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <div className="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-[#082252] text-white transition-colors  ">
                <LuPhone className="w-[30px] h-[20px]" />
              </div>
              <p className="font-[FahKwang] font-[800]  transition-colors">
                {t("cotactUs.call.callUs")}
              </p>
            </div>

            <p className="  transition-colors">
              {t("cotactUs.call.p1")}
            </p>

            <p
              className="font-[FahKwang] font-[800] text-[14px] sm:text-[12px] md:text-[18px]   transition-colors"
              dangerouslySetInnerHTML={{
                __html: t("cotactUs.call.p2"),
              }}
            />
          </div>
        </div>

        {/* EMAIL US */}
        <div className="w-[55%] lg:w-full">
          <div className="p-[4%] rounded-[5px] bg-white h-[180px] lg:h-[150px] flex flex-col justify-between gap-[4%] group">
            <div
              className={`flex gap-[1%] items-center transition-colors ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <div className="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-[#082252] text-white transition-colors hover:bg-[#082252]">
                <AiOutlineMail className="w-[35px] h-[20px]" />
              </div>
              <p className="font-[FahKwang] font-[800] hover-underline transition-colors">
                {t("cotactUs.email.writeUs")}
              </p>
            </div>

            <p className="  transition-colors">
              {t("cotactUs.email.p1")}
            </p>

            <p
              className="font-[FahKwang] font-[800] text-[14px] sm:text-[12px] md:text-[18px]  transition-colors"
              dangerouslySetInnerHTML={{
                __html: t("cotactUs.email.p2"),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
