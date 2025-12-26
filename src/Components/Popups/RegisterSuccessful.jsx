
import 'react-phone-number-input/style.css';
import { Link} from "react-router-dom";
import { IoIosCheckmark } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import { useState } from 'react';
function RegisterSuccessful() {
  const [t, i18n] = useTranslation("global");
  const [setLang] = useState(localStorage.getItem("lang") || "en");
  // const selectedLang = localStorage.getItem("lang");
  
  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
      setLang(selectedLang);
    }
  }, [i18n]);


  // const isArabic = lang === "ar";

  return (
    <div className='w-[100%] h-[90vh]'>
    <div className='w-[100%] h-[90%] absolute z-[2] flex justify-center items-center'>
      <div className=' w-[450px] h-[300px] xl:right-[28%] xl:top-[40%] flex justify-center items-center'>
          <div className='bg-white w-[80%] h-[100%] flex justify-center items-center flex-col gap-[3%]'>
           <div className=' flex justify-center items-center flex-col'>
           <div className=' w-[70px] bg-[#D1D4E0] h-[70px] rounded-full flex items-center justify-center'>
           <div className=' w-[55px] bg-[#B1B6CA] h-[55px] rounded-full flex items-center justify-center'>
           <div className='  bg-[#656E9A] w-[40px] h-[40px] rounded-full flex items-center justify-center '>
           <div className=' flex justify-center items-center '>
           <IoIosCheckmark className='text-white text-[30px]'/>
            </div>
            </div>
            </div> 
  
            </div>
           
            
            <p className=' font-[600]  text-center'>{t("popUps.signupSuccess.title")}</p>
            </div>
            <p className='text-center'> {t("popUps.signupSuccess.p1")}</p>
             <div className='w-[100%] h-[40px] flex items-center justify-center'>
             <Link to="/login" className=" w-[90%] h-[40px] text-white
                    bg-[#676f98] hover:bg-[#2f4672]
                    hover:text-[#E79E7F] flex justify-center items-center">{t("popUps.signupSuccess.btn")}</Link>
              </div>
          </div>
          
      </div>
      </div>
   
      
  </div>
  )
}

export default RegisterSuccessful