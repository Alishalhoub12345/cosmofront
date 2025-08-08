import React, { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import DashboardMenu from "./DashboardMenu";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IoIosCheckmark } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function PersonalInformation() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [showPopUpStatus, setShowPopUpStatus] = useState(false);
  const [popUpInfoEmail, setPopUpInfoEmail] = useState({
    message: "",
    success: false,
  });

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

  const PREFIX_LENGTH = 250;
  const SUFFIX_LENGTH = 8;

  const extractUserId = (obfuscatedUserId) => {
    return obfuscatedUserId.slice(
      PREFIX_LENGTH,
      obfuscatedUserId.length - SUFFIX_LENGTH
    );
  };

  const obfuscatedUser = localStorage.getItem("clientInfo");
  const user = obfuscatedUser ? extractUserId(obfuscatedUser) : null;

  const fetchUserAccount = async () => {
    const res = await axios.get(
      `https://www.cosmo.global/laravel/api/user-account/${user}`
    );
    return res.data.user;
  };

  const mutation = useMutation(
    (updatedUser) =>
      axios.post(
        `https://www.cosmo.global/laravel/api/update-user-account/${user}`,
        updatedUser
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userAccount");
        setPopUpInfoEmail({
          message: "Profile updated successfully!",
          success: true,
        });
        setShowPopUpStatus(true);
        setTimeout(() => setShowPopUpStatus(false), 3000);
      },
      onError: () => {
        setPopUpInfoEmail({
          message: "Failed to update profile.",
          success: false,
        });
        setShowPopUpStatus(true);
        setTimeout(() => setShowPopUpStatus(false), 3000);
      },
    }
  );

  const queryClient = useQueryClient();

  const {
    data: userAcc,
    isLoading,
    error,
  } = useQuery("userAccount", fetchUserAccount, {
    enabled: !!user,
    onSuccess: (data) => {
      setPhoneNumber(data.phone_number || "");
    },
  });

  const fillAddressFields = () => {
    if (userAcc) {
      if (firstNameRef.current)
        firstNameRef.current.value = userAcc.FirstName || "";
      if (lastNameRef.current)
        lastNameRef.current.value = userAcc.LastName || "";
      if (emailRef.current) emailRef.current.value = userAcc.Email || "";
      if (genderRef.current) genderRef.current.value = userAcc.gender || "";
    }
  };

  const updateAccount = async (e) => {
    e.preventDefault();
    try {
      setLoadingSave(true);
      const updatedUser = {
        FirstName: firstNameRef.current.value,
        LastName: lastNameRef.current.value,
        Email: emailRef.current.value,
        gender: genderRef.current.value,
        phone_number: phoneNumber,
      };
      await mutation.mutateAsync(updatedUser);
    } catch (error) {
      console.error("Failed to update user account:", error);
    } finally {
      setLoadingSave(false);
    }
  };

  useEffect(() => {
    fillAddressFields();
  }, [userAcc]);

  return (
    <>
      {showPopUpStatus && (
        <div
          className={`popup flex justify-between w-[280px] bg-[white] px-[1%] fixed right-[2%] top-[15%] z-[20] h-[100px]`}
        >
          <div className="h-[100%] w-[50%] justify-evenly items-center flex">
            <div className="flex justify-center items-center h-[100%]">
              {popUpInfoEmail.success ? (
                <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full text-white bg-[#676F98]">
                  <IoIosCheckmark className="text-[40px]" />
                </div>
              ) : (
                <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full text-white bg-[#FF6F6F]">
                  <AiOutlineClose className="text-[20px]" />
                </div>
              )}
            </div>
          </div>
          <div className="h-[100%] w-[60%] flex justify-center flex-col">
            <p className="text-left text-[12px]">{popUpInfoEmail.message}</p>
          </div>
        </div>
      )}
      <div className="p-[2%] h-[100vh] sm:h-[auto] font-[FrutigerLTCom-Roman]">
        <h1
          className={`text-[40px] font-[FahKwang] md:text-[25px] md:py-[5%] pb-[2%] ${
            isArabic ? "text-right" : ""
          }`}
        >
          {t("dashboard.personalInfo.title")}
        </h1>
        <div
          className={`flex gap-[2%]  items-start lg:flex-col ${
            isArabic ? " flex-row-reverse" : ""
          }`}
        >
          <DashboardMenu />
          <div className="bg-white lg:w-[100%] px-[2%] w-[70%] pb-[2%] ">
            {isLoading ? (
              <div className="h-[400px] flex justify-center items-center">
                <svg className="circular-loader" viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              </div>
            ) : (
              <form
                onSubmit={updateAccount}
                className="flex gap-[1%] flex-col "
              >
                <p
                  className={`h-[40px] flex items-end  ${
                    isArabic ? "text-right justify-end text-[15px]" : ""
                  }`}
                >
                  <strong>{t("dashboard.personalInfo.myProfile")}</strong>
                </p>
                <div className="flex gap-[2%]  w-[100%] sm:flex-col ">
                  <div className="flex justify-start flex-col  sm:mt-[3%] sm:w-[100%] w-[40%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.firstName")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      ref={firstNameRef}
                      type="text"
                      className={`h-[40px]  p-[2%] sm:w-[100%] border-[1px] border-[black] rounded-[2px] ${
                        isArabic ? "text-right" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="flex justify-start flex-col  sm:mt-[3%] sm:w-[100%] w-[40%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.lastName")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      ref={lastNameRef}
                      type="text"
                      className={`h-[40px]  p-[2%] sm:w-[100%] border-[1px] border-[black] rounded-[2px] ${
                        isArabic ? "text-right" : ""
                      }`}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-[2%]  w-[100%] sm:flex-col ">
                  <div className="flex justify-start flex-col  sm:mt-[3%] sm:w-[100%] w-[40%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.login.email")}{" "}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      className={`h-[40px]  p-[2%] sm:w-[100%] border-[1px] border-[black] rounded-[2px] ${
                        isArabic ? "text-right" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="w-[40%] sm:w-[100%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.phone")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <PhoneInput
                      className="bg-transparent border-[0.5px] border-[black] px-[2%] rounded-[2px] w-[100%] countryCode"
                      international
                      required
                      countryCallingCodeEditable={false}
                      defaultCountry="LB"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                    />
                  </div>
                </div>
                <div className="md:w-[100%]">
                  <p
                    className={`h-[30px] flex w-[40%] items-center ${
                      isArabic
                        ? "flex-row-reverse text-[16px] md:w-[100%] xl:w-[50%]"
                        : ""
                    }`}
                  >
                    {t("Authentication.signUp.gender")}{" "}
                    <span className="text-[#E79E7F] mt-[-0.5%] ">*</span>
                  </p>
                  <div
                    className={` w-[40%] md:w-[100%] xl:w-[50%] ${
                      isArabic ? "" : "dropdown-container"
                    }`}
                  >
                    <select
                      className={`h-[4.5vh] p-[2%]  2xl:py-[0%] lg:px-[1%] border-[0.5px] border-[black] rounded-[2px] custom-select cursor-pointer text-[0.8vw] xl:text-[15px] px-[2%] ${
                        isArabic ? "text-right" : ""
                      }`}
                      required
                      ref={genderRef}
                    >
                      <option value="Female">
                        {t("Authentication.signUp.female")}
                      </option>
                      <option value="Male">
                        {t("Authentication.signUp.male")}
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  className={`w-[95%] h-[100px] flex  items-end ${
                    isArabic ? "" : "justify-end items-end"
                  }`}
                >
                  <div className="flex w-[150px] hover:bg-[#2f4672] bg-[#676f98] hover:text-[#E79E7F] text-white cursor-pointer h-[30px] justify-evenly items-center">
                    <button
                      className="h-[30px]"
                      type="submit"
                      disabled={loadingSave}
                    >
                      {loadingSave
                        ? "Loading..."
                        : t("dashboard.personalInfo.save")}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;
