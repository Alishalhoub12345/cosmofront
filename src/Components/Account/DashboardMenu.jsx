import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SlLocationPin } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";
import { BsBoxSeam } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import wave from "../../images/Account/Hello.png"
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';

function DashboardMenu() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const navigate = useNavigate();
  const name= localStorage.getItem("firstName")

  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const selectedLang = localStorage.getItem("lang");
  
  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
      setLang(selectedLang);
    }
  }, [i18n]);
  


  const isArabic = lang === "ar";


  const handleLogout=()=>{

    Object.keys(localStorage).forEach((key) => {
    
        if (key !== "currencyUsed") {
          localStorage.removeItem(key);
        }
      
    });
    window.dispatchEvent(new Event("storage"));
    navigate("/")
    
  }

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const linkClasses = (path) => 
    `border-[0.5px] lg:w-[50%] hover:bg-[#676F98] hover:text-white cursor-pointer h-[50px] gap-[5%] flex items-center px-[10%] xl:px-[2%] lg:px-[1%] ${
      activeLink === path ? 'bg-[#676F98] text-white' : ''
    }`;

  return (
    <div className='w-[19%] flex flex-col lg:w-[100%] justify-end'>
      <div className='bg-white '>
        <div className={`border-[1px] h-[50px] flex justify-center px-[10%] flex-col ${isArabic?"items-end":""}`}>
        
          <img className='w-[40px]' src={wave} alt='wave-icon'></img>
          <p className={`${isArabic?"w-[100%] text-right":""}`}><strong>{name}</strong></p>
        </div>
        <div className='lg:flex'>
        <Link 
          to="/account" 
          className={`${linkClasses('/account')} ${isArabic ? " flex flex-row-reverse" : ""}`} 
          onClick={() => handleLinkClick('/account')}
        >
          <div className=' md:w-[15px] md:h-[15px] sm:hidden w-[20px] h-[20px]'>
            <VscAccount className='w-[100%] h-[100%] ' />
          </div>
          <p className='md:text-[12px]'> {t("dashboard.personalInfo.personalInfo")}</p>
        </Link>
        <Link 
          to="/account-orders" 
          className={`${linkClasses('/account-orders')}  ${isArabic ? " flex flex-row-reverse" : ""}`} 
          onClick={() => handleLinkClick('/account-orders')}
        >
          <div className= 'md:w-[15px] md:h-[15px] sm:hidden w-[20px] h-[20px]'>
            <BsBoxSeam className='w-[100%] h-[100%] ' />
          </div>
          <p className='md:text-[12px]'>{t("dashboard.personalInfo.orders")}</p>
        </Link>
        <Link 
          to="/manage-address" 
          className={`${linkClasses('/manage-address')}  ${isArabic ? " flex flex-row-reverse" : ""}`} 
          onClick={() => handleLinkClick('/manage-address')}
        >
          <div className=' md:w-[15px] md:h-[15px] sm:hidden w-[20px] h-[20px]'>
            <SlLocationPin className='w-[100%] h-[100%] ' />
          </div>
          <p className='md:text-[12px]'>{t("dashboard.personalInfo.manageAddress")}</p>
        </Link>

        </div>
       
      </div>
      <div className='w-[100%] h-[80px] items-center flex justify-end'>
        <div className='flex w-[150px] bg-[#082252] text-white cursor-pointer h-[40px] justify-evenly items-center'>
          <RiLogoutBoxRLine className='w-[25px] h-[30px]' />
          <button className='h-[30px]' onClick={handleLogout}>{t("dashboard.personalInfo.logout")}</button>
        </div> 
      </div>
    </div>
  );
}

export default DashboardMenu;
