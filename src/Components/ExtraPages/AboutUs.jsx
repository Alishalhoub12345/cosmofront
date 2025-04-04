import React, { useState, useEffect } from "react";
import image1 from "../../images/AboutUs/aboutus_1.jpg";
import image2 from "../../images/AboutUs/aboutus_2.jpg";
import diamond from "../../images/AboutUs/Vector.svg";
import peachC from "../../images/AboutUs/C peach on blue.png";
import parrot from "../../images/Home/parrot.png";
import { useTranslation } from "react-i18next";

function AboutUs() {
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
    <div className="bg-[white]">
      <div className="w-[100%] uppercase bg-[#F1F1F1] xl:h-[auto] flex flex-row lg:flex-col justify-between items-center h-[80vh]">
        <div
          className={`w-[50%] lg:w-[80%] lg:py-[5%] md:pt-[10%] flex justify-center flex-col items-center text-center 2xl:p-[0%] p-[5%] ${
            isArabic ? " text-[20px] " : ""
          }`}
        >
          <div className="flex justify-center flex-col items-center">
            <div className="flex justify-center w-[100%] items-center flex-col">
              <h1
                className={`text-[40px] md:w-[100%] font-[FahKwang] px-[2%] xl:text-[35px] md:text-[25px] sm:text-[20px] ${
                  isArabic ? " text-[20px]" : ""
                }`}
              >
                {t("aboutUs.firstSection.title")}
              </h1>
              <img src={diamond} className="w-[100px]" alt="diamond" />
            </div>
            <div className="flex justify-center items-center p-[2%]">
              <p
                className={`xl:w-[100%] w-[80%] ${
                  isArabic ? " text-[20px]" : ""
                }`}
              >
                {t("aboutUs.firstSection.desc1")}
              </p>
            </div>
            <div className="flex justify-center items-center px-[2%]">
              <p
                className={`xl:w-[100%] w-[80%] md:pt-[2%] ${
                  isArabic ? " text-[20px]" : ""
                }`}
              >
                {t("aboutUs.firstSection.desc2")}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[100%] lg:w-[70%] w-[50%] flex justify-center">
          <div className="h-[100%] xl:h-[auto] w-[60%]">
            <img
              className="w-[100%] border-[1px] border-t-[0px] border-white h-[100%] object-cover"
              src={image2}
              alt="about-us"
            />
          </div>
          <div className="w-[40%] h-[100%]">
            <div className="border-[1px] h-[65%] border-t-[0px] border-white">
              <img
                src={image1}
                className="w-[100%] h-[100%] object-cover"
                alt="about-us"
              />
            </div>
            <div className="xl:h-[auto] h-[35%] border-[1px] border-white">
              <img
                src={peachC}
                className="h-[100%] w-[100%] object-cover"
                alt="peach"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[white] w-[100%] flex justify-center items-center flex-col p-[5%] text-center">
        <div className="flex justify-center w-[100%] items-center flex-col">
          <img
            src={parrot}
            className="xl:w-[80px] pb-[1%] w-[100px]"
            alt="parrot"
          />
          <h1
            className={`text-[40px] md:w-[100%] font-[FahKwang] px-[2%] xl:text-[35px] md:text-[25px] sm:text-[20px] ${
              isArabic ? " text-[20px]" : ""
            }`}
          >
            {t("aboutUs.secondSection.title")}
          </h1>
        </div>
        <div className="flex justify-center uppercase flex-col items-center">
          <p
            className={`w-[84%] xl:w-[100%] py-[1%] ${
              isArabic ? " text-[20px]" : ""
            }`}
          >
            {t("aboutUs.secondSection.desc1")}
          </p>
          <p
            className={`w-[84%] xl:w-[100%] ${isArabic ? " text-[20px]" : ""}`}
          >
            {t("aboutUs.secondSection.desc2")}
          </p>
        </div>
      </div>

      <div
        className={`flex justify-between lg:h-[auto] lg:flex-col items-center relative w-[100%] h-[100vh] xl:h-[90vh] ${
          isArabic ? "justify-end" : ""
        }`}
      >
        <div className="absolute top-[0%] md:w-[100%] lg:w-[70%] lg:pb-[2%] lg:h-[50%] lg:relative xl:left-[2%] lg:left-[0%] left-[10%] w-[40%] h-[100%]">
          <img
            className="w-[100%] h-[100%] object-cover lg:object-contain"
            src={image1}
            alt="about us"
          />
        </div>
        <div className="uppercase lg:w-[100%] h-[85%] bg-[#F1F1F1] lg:py-[5%] justify-end items-center flex flex-row">
          <div className="text-center flex h-[100%] lg:w-[100%] justify-center w-[50%] items-center flex-col">
            <h1
              className={`text-[40px] md:w-[100%] font-[FahKwang] xl:text-[35px] md:text-[25px] sm:text-[20px] ${
                isArabic ? " text-[20px]" : ""
              }`}
            >
              {t("aboutUs.ThirdSection.title")}
            </h1>
            <img src={diamond} className="w-[100px]" alt="diamond" />
            <div className="flex justify-center items-center p-[2%]">
              <p
                className={`xl:w-[100%] w-[80%] ${
                  isArabic ? " text-[20px]" : ""
                }`}
              >
                {t("aboutUs.ThirdSection.desc1")}
              </p>
            </div>
            <div className="flex justify-center items-center px-[2%]">
              <p
                className={`xl:w-[100%] w-[80%] md:pt-[2%] ${
                  isArabic ? " text-[20px]" : ""
                }`}
              >
                {t("aboutUs.ThirdSection.desc2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
