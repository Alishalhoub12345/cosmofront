import React, { useEffect, useState } from 'react'
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
    <div className={`w-[100%] h-[80vh] px-[5%] lg:h-[auto] lg:py-[2%] pt-[2%] font-[FrutigerLTCom-Roman] ${isArabic?"text-right":""}`}>
     <h1 className='text-[40px] font-[FahKwang] px-[2%] lg:text-[40px] md:text-[25px]'>  {t("cotactUs.mainTitle")}</h1>
      <div className=' mt-[2%] flex px-[2%] h-[350px] lg:flex-wrap justify-between gap-[2%] '>
      
        <div className=' w-[55%] h-[10%] lg:w-[100%]   '>
        
          <div className='p-[4%] rounded-[5px] bg-white  h-[180px] lg:h-[150px] lg:justify-center gap-[4%] w-[100%] flex flex-col justify-between'>
            <div className={` flex gap-[1%]  items-center ${isArabic?" flex-row-reverse text-[20px] ":""}`}>
              <div className=' flex justify-center bg-[#676F98] text-white rounded-full items-center w-[35px] h-[35px] '>
                <LuPhone className='w-[30px] h-[20px]  ' />
              </div>
          
            <p className='font-[FahKwang] font-[800]'>{t("cotactUs.call.callUs")}</p>
            </div>
            <p>{t("cotactUs.call.p1")}</p>
            <p className='text-[#E79E7F] font-[FahKwang] font-[800] text-[14px] sm:text-[12px] md:text-[18px]' dangerouslySetInnerHTML={{
                __html: t("cotactUs.call.p2"),
              }}/>

          </div>
        </div>
        <div className='  w-[55%] h-[10%] lg:w-[100%] '>
       
          <div className='p-[4%] rounded-[5px] bg-white h-[180px] lg:h-[150px] lg:justify-center gap-[4%] w-[100%] flex flex-col justify-between'>
            <div className={` flex gap-[1%]  items-center ${isArabic?" flex-row-reverse text-[20px]":""}`}>
              <div className=' flex justify-center bg-[#676F98] text-white rounded-full items-center w-[35px] h-[35px] '>
                <AiOutlineMail className='w-[35px] h-[20px]  ' />
              </div>
          
            <p className='font-[FahKwang] font-[800]'>{t("cotactUs.email.writeUs")}</p>
            </div>
            <p>{t("cotactUs.email.p1")}</p>
            <p  className='text-[#E79E7F] font-[FahKwang] font-[800] text-[14px] sm:text-[12px] md:text-[18px]' dangerouslySetInnerHTML={{
                __html: t("cotactUs.email.p2"),
              }}/>
           

          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs