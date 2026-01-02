import React, { useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

function FAQ() {
  const { t, i18n } = useTranslation("global");

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [i18n]);

  const data = t("faq.questions", { returnObjects: true });

  const [openFaqs, setOpenFaqs] = useState(Array(data.length).fill(false));

  const toggleFaq = (index) => {
    setOpenFaqs((prevOpenFaqs) => {
      const newOpenFaqs = [...prevOpenFaqs];
      newOpenFaqs[index] = !newOpenFaqs[index];
      return newOpenFaqs;
    });
  };

    const isArabic = localStorage.getItem("lang") === "ar";

  return (
    <div
      className={`text-[#082252] w-[100%] px-[5%] h-[auto] lg:py-[2%] pt-[2%] md:pt-[5%] font-[FrutigerLTCom-Roman] ${
        isArabic ? "text-right" : ""
      }`}
    >
      <div className="px-[2%]">
        <h1 className="text-[40px] pb-[2%] font-[FahKwang] lg:text-[40px] md:text-[23px]">
          {t("faq.title")}
        </h1>
        {data.map((dataInfo, index) => (
          <div
            key={index}
            className="text-[18px] md:text-[15px] h-[auto] pb-[1%]"
          >
            <div
              onClick={() => toggleFaq(index)}
              className={`h-[50px] ${
                isArabic ? "flex-row-reverse text-[20px] lg:text-[15px]" : ""
              } flex items-center cursor-pointer justify-between px-[2%] ${
                index % 2 === 0 ? "bg-[#dfdfdf]" : "bg-[#cac7c7]"
              }`}
            >
              <p className="uppercase">{dataInfo.question}</p>
              {openFaqs[index] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {openFaqs[index] && (
              <div className="flex-col flex justify-center text-[15px]">
                <p
                  className="py-[1%]"
                  dangerouslySetInnerHTML={{ __html: dataInfo.answer1 }}
                />
                {dataInfo.answer2 && <p>{dataInfo.answer2}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
