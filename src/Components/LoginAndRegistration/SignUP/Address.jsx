import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import cart from "../../../images/Navbar/white-cart.png";
import loginImage from "../../../images/Authentication/login-bag.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import RegisterSuccessful from "../../Popups/RegisterSuccessful";
import { useTranslation } from "react-i18next";
import { IoIosArrowRoundForward } from "react-icons/io";

function Address() {
  const [signUpResult, setSignUpResult] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [countriesReg, setCountriesReg] = useState([]);
  const [registerResponse, setRegisterResponse] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Lebanon");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [apartment, setApartment] = useState("");
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

  const getCountriesReg = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/shipping-countries",
      { params: { locale: selectedLang } }
    );
    setCountriesReg(res.data.message);
  };

  useEffect(() => {
    getCountriesReg();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpLoading(true);

    const accntInfo = JSON.parse(localStorage.getItem("clientReg"));
    const account = {
      email: accntInfo.email,
      firstName: accntInfo.firstName,
      gender: accntInfo.gender,
      lastName: accntInfo.lastName,
      password: accntInfo.password,
      phoneNumber: accntInfo.phoneNumber,
      country: selectedCountry,
      region,
      address,
      city,
      zipcode,
      apartment,
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/user-signup",
        account
      );
      setSignUpResult(res.data.message);

      if (res.data.message === "User Registered Successfully") {
        setRegisterResponse(true);
        await axios.post(`http://127.0.0.1:8000/api/email-after-singup`, {
          email: res.data.user.Email,
        });
        localStorage.removeItem("clientReg");
        return res.data.user;
      } else {
        console.error("Registration failed: ", res.data.message);
      }
    } catch (error) {
      console.error("Error during sign up", error);
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <>
      {registerResponse === true ? (
        <RegisterSuccessful />
      ) : (
        <div className="">
          <div
            className={`w-[100%] h-[90vh] lg:h-[auto] flex-wrap font-[FrutigerLTCom-Roman] flex items-start justify-start lg:justify-center bg-[#F1F5FF] ${
              isArabic ? "flex-row-reverse text-right" : ""
            }`}
          >
            <div className="w-[50%] lg:w-[80%] sm:w-[90%] h-[100%] lg:h-[auto] flex justify-center xl:pt-[2%] pt-[5%] lg:py-[5%] items-center">
              <div className="h-[100%] w-[55%] lg:px-[3%] 2xl:w-[80%] lg:w-[100%] flex flex-col">
                <div
                  className={`lg:w-[95%]  xl:pb-[2%]  ${isArabic ? "" : ""}`}
                >
                  <div
                    className={`h-[30px] flex w-[100%] ${
                      isArabic ? "justify-end" : "justify-start"
                    }`}
                  >
                    <Link to="/signup-account">
                      <div className="border-[0.5px] border-[black] rounded-full w-[100%] h-[100%] hover:border-[#E79E7F] cursor-pointer">
                        {isArabic ? (
                          <IoIosArrowRoundForward className="w-[100%] h-[100%] hover:text-[#E79E7F]" />
                        ) : (
                          <IoIosArrowRoundBack className="w-[100%] h-[100%] hover:text-[#E79E7F]" />
                        )}
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`lg:w-[95%] xl:pb-[5%] ${
                      isArabic ? "text-right " : ""
                    }`}
                  >
                    <h1 className="font-[FahKwang] text-[40px] xl:text-[30px]  lg:w-[100%]   md:text-[6.5vw]">
                      {t("Authentication.signUp.addressTitle")}
                    </h1>
                    <p
                      className={`text-[15px] sm:text-[12px] lg:w-[100%] ${
                        isArabic ? " w-[100%] " : " w-[350px] "
                      }`}
                    >
                      {t("Authentication.signUp.addressDesc")}
                    </p>
                  </div>
                </div>
                <form className="w-[100%] xl:justify-start xl:gap-[5%] h-[80%] flex justify-evenly flex-col">
                  <div className="h-[fit-content] flex flex-col justify-evenly">
                    <div className="flex justify-start flex-col">
                      <label
                        className={`h-[30px] flex items-center text-[15px] ${
                          isArabic ? "flex-row-reverse" : ""
                        }`}
                      >
                        {t("Authentication.signUp.country")}
                        <span className="text-[#E79E7F] h-[100%]">*</span>
                      </label>
                      <div
                        className={`  ${isArabic ? "" : "dropdown-container"}`}
                      >
                        <select
                          className={`h-[4.5vh] px-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] custom-select cursor-pointer w-[100%] text-[0.8vw] xl:text-[15px] ${
                            isArabic ? "  text-right" : ""
                          }`}
                          value={selectedCountry}
                          required
                          onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                          {countriesReg.map((count) => (
                            <option key={count.id} value={count.country_name}>
                              {count.country_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-start flex-col">
                      <label
                        className={`h-[30px] flex items-center text-[15px] ${
                          isArabic ? "flex-row-reverse" : ""
                        }`}
                      >
                        {t("Authentication.signUp.region")}
                        <span className="text-[#E79E7F] h-[100%]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                          isArabic ? " text-right" : ""
                        }`}
                      />
                    </div>
                    <div className="flex justify-start flex-col">
                      <label
                        className={`h-[30px] flex items-center text-[15px] ${
                          isArabic ? "flex-row-reverse" : ""
                        }`}
                      >
                        {t("Authentication.signUp.address")}
                        <span className="text-[#E79E7F] h-[100%]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                          isArabic ? " text-right" : ""
                        }`}
                      />
                    </div>
                    <div className="flex justify-between w-[100%]">
                      <div className="w-[49%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse" : ""
                          }`}
                        >
                          {t("Authentication.signUp.city")}
                          <span className="text-[#E79E7F] h-[100%]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] w-[100%] ${
                            isArabic ? " text-right" : ""
                          }`}
                        />
                      </div>
                      <div className="w-[49%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse" : ""
                          }`}
                        >
                          {t("Authentication.signUp.zipCode")}
                          <span className="text-[#E79E7F] h-[100%]">*</span>
                        </label>
                        <input
                          type="text"
                          value={zipcode}
                          required
                          onChange={(e) => setZipcode(e.target.value)}
                          className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] w-[100%] rounded-[2px] ${
                            isArabic ? " text-right" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex justify-start flex-col">
                      <label
                        className={`h-[30px] flex items-center text-[15px] ${
                          isArabic ? "flex-row-reverse" : ""
                        }`}
                      >
                        {t("Authentication.signUp.apartment")}
                        <span className="text-[#E79E7F] h-[100%]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                          isArabic ? " text-right" : ""
                        }`}
                      />
                    </div>
                    <p className="text-[12px]">
                      <span className="text-[#E79E7F]">*</span>{" "}
                      {t("Authentication.signUp.required")}
                    </p>
                  </div>
                  <div className="flex items-center justify-end flex-col gap-[2%] h-[100px]">
                    <button
                      className="w-[100%] h-[4.5vh] text-white bg-[#676f98] hover:bg-[#2f4672] hover:text-[#E79E7F]"
                      disabled={signUpLoading}
                      onClick={handleSignUp}
                    >
                      {signUpLoading
                        ? "Loading..."
                        : t("Authentication.login.sign")}
                    </button>
                    {signUpResult && (
                      <p className="text-[#E79E7F] text-[12px]">
                        {signUpResult}
                      </p>
                    )}
                    <p className="text-[12px] text-[#1e335a]">
                      {t("Authentication.signUp.haveAccount")}
                      <Link
                        to="/login"
                        className="font-[700] underline underline-offset-1 hover:text-[#E79E7F]"
                      >
                        {t("Authentication.login.loginBtn")}
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-[50%] lg:w-[75%]  h-[100%] md:hidden">
              <img
                src={loginImage}
                alt="login"
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Address;
