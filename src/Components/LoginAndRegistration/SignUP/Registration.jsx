import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginImage from "../../../images/Authentication/login-bag.png";
import { IoEyeOffOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from "axios";
import { useTranslation } from "react-i18next";

function Registration() {
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpError, setSignUpError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
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



    const navigate = useNavigate();

    useEffect(() => {
        const savedClientInfo = localStorage.getItem("clientReg");
        if (savedClientInfo) {
            const { firstName, lastName, email, phoneNumber, gender, password } = JSON.parse(savedClientInfo);
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setPhoneNumber(phoneNumber);
            setGender(gender);
            setSignUpPassword(password);
        }
    }, []);

    const handleNextPage = (e) => {
        e.preventDefault()
        if (!firstName || !lastName || !email || !phoneNumber || !gender || !signUpPassword) {
            setSignUpError("All fields are required.");
            return;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            setSignUpError("Please enter a valid phone number.");
            return;
        }

        setSignUpLoading(true);
        const account = {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            password: signUpPassword,
        };
        localStorage.setItem("clientReg", JSON.stringify(account));
        setSignUpLoading(false);
        navigate("/signup-address");
    };

    return (
        <>
            <div className={`w-[100%] text-[#082252] h-[90vh] lg:h-[auto] flex-wrap font-[FrutigerLTCom-Roman] flex items-start justify-start lg:justify-center bg-[#EEEEEE] ${isArabic?"flex-row-reverse":""}`}>
                <div className="w-[50%] lg:w-[80%] sm:w-[90%] h-[100%] lg:h-[auto] flex justify-center xl:pt-[2%] pt-[5%] lg:py-[5%] items-center">
                    <div className="h-[100%] w-[55%] lg:px-[3%] 2xl:w-[80%] lg:w-[100%] flex flex-col">
                        <div className={`lg:w-[95%] xl:pb-[5%]  ${isArabic?" text-right":""}`}>
                            <h1 className="font-[FahKwang] text-[40px] xl:text-[30px]  lg:w-[100%] text-[#082252]  md:text-[6.5vw]">{t("Authentication.signUp.title")}</h1>
                            <p className={`text-[15px] sm:text-[12px] lg:w-[100%] ${isArabic?"":" w-[350px]"}`}>{t("Authentication.signUp.desc")}</p>
                        </div>
                        <form className="w-[100%] xl:justify-start xl:gap-[5%] h-[80%] flex justify-evenly flex-col">
                            <div className="h-[fit-content] flex flex-col justify-evenly">
                                <div className="flex justify-start flex-col">
                                    <label className={`h-[30px] flex items-center  ${isArabic?"flex-row-reverse text-right":""}`}>{t("Authentication.signUp.firstName")}<span className="text-[#082252] mt-[-1%]" >*</span></label>
                                    <input required
                                        type="text"
                                        className={`h-[4.5vh] p-[2%] bg-[#EEEEEE] border-[1px] border-[#082252] rounded-[2px] ${isArabic?"text-right":""}`}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-start flex-col">
                                    <label className={`h-[30px] flex items-center  ${isArabic?"flex-row-reverse text-right":""}`}>{t("Authentication.signUp.lastName")}<span className="text-[#082252] mt-[-1%]" >*</span></label>
                                    <input required
                                        className={`h-[4.5vh] p-[2%] bg-[#EEEEEE] border-[1px] border-[#082252] rounded-[2px] ${isArabic?"text-right":""}`}
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-start flex-col">
                                    <label className={`h-[30px] flex items-center  ${isArabic?"flex-row-reverse text-right":""}`}>{t("Authentication.login.email")}<span className="text-[#082252] mt-[-1%]" >*</span></label>
                                    <input
                                        type="email"
                                        className={`h-[4.5vh] p-[2%] bg-[#EEEEEE] border-[1px] border-[#082252] rounded-[2px] ${isArabic?"text-right":""}`}
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <label className={`h-[30px] flex items-center  ${isArabic?"flex-row-reverse text-right":""}`}>{t("Authentication.signUp.phone")} <span className="text-[#082252] mt-[-1%]" >*</span></label>
                                    <div className="">
                                        <div className="">
                                            <PhoneInput
                                                className="bg-transparent border-[0.5px] border-[#082252] px-[2%] rounded-[2px] w-[100%] countryCode"
                                                international required
                                                countryCallingCodeEditable={false}
                                                defaultCountry="LB"
                                                value={phoneNumber}
                                                onChange={setPhoneNumber}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className={`h-[30px] flex items-center  ${isArabic?"flex-row-reverse text-right":""}`}>{t("Authentication.signUp.gender")} <span className="text-[#082252] mt-[-1%]" >*</span></p>
                                    <div className={`${isArabic?"":"dropdown-container"}`}>
                                        <select
                                            className={`h-[4.5vh] p-[2%] 2xl:py-[0%] lg:px-[1%] bg-[#EEEEEE] border-[0.5px] border-[#082252] rounded-[2px] custom-select cursor-pointer w-[100%] text-[0.8vw] xl:text-[15px]  ${isArabic?"text-right":" px-[2%]"}`}
                                            value={gender} required
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="">{t("Authentication.signUp.select")}</option>
                                            <option value="Female">{t("Authentication.signUp.female")}</option>
                                            <option value="Male">{t("Authentication.signUp.male")}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-start flex-col pt-[1%] relative">
                                    <label className={`h-[30px] flex items-center  ${isArabic?"flex-row-reverse text-right":""}`}>{t("Authentication.login.pass")} <span className="h-[100%] text-[#082252] mt-[-1%]" >*</span></label>
                                    <input
                    type={showPassword ? "text" : "password"}
                    className={`h-[40px] p-[2%] bg-[#EEEEEE] border-[1px] border-[#082252] rounded-[2px]  ${isArabic?" flex text-right":"pr-[30px]"}`}
                    value={signUpPassword}
                    autoComplete="pass"
                    onChange={(e) => setSignUpPassword(e.target.value)}
                  />
                                    {showPassword ? (
                    <IoEyeOffOutline
                      className={`absolute hover:text-[#082252] cursor-pointer ${isArabic?"top-[62%] left-[10px]":"right-[10px] top-[72%] transform translate-y-[-50%]"}`}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiOutlineEye
                    className={`absolute hover:text-[#082252] cursor-pointer ${isArabic?"top-[62%] left-[10px]":"right-[10px] top-[72%] transform translate-y-[-50%]"}`}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                                </div>
                                <p className="text-[12px]"><span className="text-[#082252] mt-[-1%]" >*</span>{t("Authentication.signUp.required")}</p>
                            </div>
                            <div className="flex items-center justify-end flex-col gap-[2%] h-[100px]">
                                <button className="w-[100%] h-[4.5vh] text-white flex justify-center items-center hover:bg-[#676f98] bg-[#082252] " disabled={signUpLoading} onClick={handleNextPage}>
                                    {signUpLoading ? 'Loading...' : t("Authentication.signUp.next")}
                                </button>
                                {signUpError && <p className="text-[#082252] text-[12px]">{signUpError}</p>}
                                <p className="text-[12px] text-[#1e335a]">{t("Authentication.signUp.haveAccount")} <Link to="/login" className="font-[700] hover:underline underline-offset-1 hover:text-[#082252]">{t("Authentication.login.loginBtn")}</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-[50%] lg:w-[75%] h-[100%] md:hidden">
                    <img src={loginImage} alt="login" className="w-[100%] h-[100%] object-cover" />
                </div>
            </div>
        </>
    );
}

export default Registration;
