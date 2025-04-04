import React from 'react';
import diamond from "../../images/AboutUs/diamond.png";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';

function AnnouncementBar() {
  const items = Array.from({ length: 200 }, (_, index) => index + 1);
  const [t, i18n] = useTranslation("global");
   useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [i18n]);
  return (
    <div className=' h-[30px] bg-[#E79E7F] flex overflow-hidden'>
      <div className=' h-full flex slide justify-evenly '>
        {items.map((item) => (
          <React.Fragment  key={item}>
           <div className=" w-[500px] flex justify-center items-center">
           <img className=' w-[20px]' src={diamond} alt="diamond" />
            <p className='text-[16px] font-[FahKwang] w-[500px] text-center'>  {t("announcementBar")}</p>

           </div>
              
        
           
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementBar;
