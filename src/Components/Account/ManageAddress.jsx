import React, { useEffect, useRef, useState } from "react";
import DashboardMenu from "./DashboardMenu";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IoIosCheckmark } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function ManageAddress() {
  const countryRef = useRef(null);
  const regionRef = useRef(null);
  const addressRef = useRef(null);
  const zipCodeRef = useRef(null);
  const cityRef = useRef(null);
  const apartmentRef = useRef(null);
  const [showPopUpStatus, setShowPopUpStatus] = useState(false);
  const [popUpInfoEmail, setPopUpInfoEmail] = useState({
    message: "",
    success: false,
  });

  const PREFIX_LENGTH = 250;
  const SUFFIX_LENGTH = 8;

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

  const extractUserId = (obfuscatedUserId) => {
    return obfuscatedUserId.slice(
      PREFIX_LENGTH,
      obfuscatedUserId.length - SUFFIX_LENGTH
    );
  };

  const obfuscatedUser = localStorage.getItem("clientInfo");
  const userId = obfuscatedUser ? extractUserId(obfuscatedUser) : null;

  const fetchCountriesReg = async () => {
    const res = await axios.get(
      "https://www.cosmo.global/laravel/api/shipping-countries",
      { params: { locale: selectedLang } }
    );
    return res.data.message;
  };

  const fetchUserAddress = async () => {
    const res = await axios.get(
      `https://www.cosmo.global/laravel/api/user-account-address/${userId}`
    );
    return res.data.user;
  };

  const queryClient = useQueryClient();

  const {
    data: countriesReg,
    error: countriesError,
    isLoading: countriesLoading,
  } = useQuery(["countriesReg"], fetchCountriesReg);

  const {
    data: userAddress,
    error: userAddressError,
    isLoading: userAddressLoading,
  } = useQuery(["userAddress", userId], fetchUserAddress, {
    enabled: !!userId,
  });

  const mutation = useMutation(
    (updatedUser) =>
      axios.post(
        `https://www.cosmo.global/laravel/api/update-user-address/${userId}`,
        updatedUser
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userAddress", userId]);
        setPopUpInfoEmail({
          message: "Address updated successfully!",
          success: true,
        });
        setShowPopUpStatus(true);
        setTimeout(() => setShowPopUpStatus(false), 3000);
      },
      onError: () => {
        setPopUpInfoEmail({
          message: "Failed to update address.",
          success: false,
        });
        setShowPopUpStatus(true);
        setTimeout(() => setShowPopUpStatus(false), 3000);
      },
    }
  );

  const fillAddressFields = () => {
    if (userAddress) {
      countryRef.current.value = userAddress.countryName || "";
      regionRef.current.value = userAddress.region || "";
      addressRef.current.value = userAddress.address || "";
      zipCodeRef.current.value = userAddress.zip_code || "";
      cityRef.current.value = userAddress.city || "";
      apartmentRef.current.value = userAddress.apartment || "";
    }
  };

  const updateAccount = async (e) => {
    e.preventDefault();
    const updatedUser = {
      address: addressRef.current.value,
      apartment: apartmentRef.current.value,
      countryName: countryRef.current.value,
      region: regionRef.current.value,
      city: cityRef.current.value,
      zip_code: zipCodeRef.current.value,
    };
    mutation.mutate(updatedUser);
  };

  useEffect(() => {
    fillAddressFields();
  }, [userAddress]);

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
      <div
        className={` p-[2%] h-[100vh] sm:h-[auto] font-[FrutigerLTCom-Roman] ${
          isArabic ? "text-right" : ""
        }`}
      >
        <h1 className="text-[40px] font-[FahKwang] md:text-[25px] md:py-[5%] pb-[2%]">
          {t("dashboard.personalInfo.title")}
        </h1>
        <div
          className={`flex gap-[2%] sm:flex-col items-start lg:flex-col ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <DashboardMenu />
          <div className="bg-white lg:w-[100%] px-[2%] w-[70%] pb-[2%]">
            {!countriesLoading && !userAddressLoading && (
              <form onSubmit={updateAccount} className="flex gap-[1%] flex-col">
                <p
                  className={`h-[40px] flex items-end ${
                    isArabic ? "justify-end text-right" : ""
                  }`}
                >
                  <strong>{t("dashboard.editAddress")}</strong>
                </p>
                <div
                  className={`flex gap-[2%] sm:flex-col w-[100%] ${
                    isArabic ? " justify-end" : ""
                  }`}
                >
                  <div className="flex justify-start flex-col w-[40%] mt-[3%] sm:w-[100%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? " flex-row-reverse" : ""
                      }`}
                    >
                      {t("Authentication.signUp.country")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <select
                      ref={countryRef}
                      className={`h-[40px]  p-[2%] border-[1px] border-[black] rounded-[2px] ${
                        isArabic ? "text-right" : ""
                      }`}
                      defaultValue={userAddress?.countryName || ""}
                      required
                    >
                      {countriesReg &&
                        countriesReg?.map((country) => (
                          <option key={country.id} value={country.country_name}>
                            {country.country_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex justify-start flex-col w-[40%] mt-[3%] sm:w-[100%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? " flex-row-reverse" : ""
                      }`}
                    >
                      {t("Authentication.signUp.zipCode")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>{" "}
                    </label>
                    <input
                      ref={zipCodeRef}
                      type="text"
                      className={`h-[40px]  p-[2%] border-[1px] border-[black] rounded-[2px] ${
                        isArabic ? "text-right" : ""
                      }`}
                      defaultValue={userAddress?.zip_code || ""}
                      required
                    />
                  </div>
                </div>
                <div
                  className={`flex gap-[2%] sm:flex-col w-[100%] ${
                    isArabic ? " justify-end" : ""
                  }`}
                >
                  <div className="flex justify-start flex-col w-[40%] mt-[3%] sm:w-[100%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? " flex-row-reverse" : ""
                      }`}
                    >
                      {t("Authentication.signUp.region")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      ref={regionRef}
                      type="text"
                      className={`h-[40px]  p-[2%] border-[1px] border-[black] rounded-[2px] ${
                        isArabic ? "text-right" : ""
                      }`}
                      defaultValue={userAddress?.region || ""}
                      required
                    />
                  </div>
                  <div className="flex justify-start flex-col w-[40%] mt-[3%] sm:w-[100%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? " flex-row-reverse" : ""
                      }`}
                    >
                      {t("Authentication.signUp.city")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      ref={cityRef}
                      type="text"
                      className={`h-[40px]  p-[2%] border-[1px] border-[black] rounded-[2px] ${
                        isArabic ? "text-right" : ""
                      }`}
                      defaultValue={userAddress?.city || ""}
                      required
                    />
                  </div>
                </div>
                <div
                  className={`flex gap-[2%] sm:flex-col w-[100%] ${
                    isArabic ? " justify-end" : ""
                  }`}
                >
                  <div className="flex justify-start flex-col w-[40%] mt-[3%] sm:w-[100%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? " flex-row-reverse" : ""
                      }`}
                    >
                      {t("Authentication.signUp.address")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      ref={addressRef}
                      type="text"
                      className={`h-[40px]  p-[2%] border-[1px] border-[black] rounded-[2px] ${
                        isArabic ? "text-right" : ""
                      }`}
                      defaultValue={userAddress?.address || ""}
                      required
                    />
                  </div>
                  <div className="flex justify-start flex-col w-[40%] mt-[3%] sm:w-[100%] xl:w-[50%]">
                    <label
                      className={`h-[30px] flex items-center ${
                        isArabic ? " flex-row-reverse" : ""
                      }`}
                    >
                      {t("Authentication.signUp.apartment")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      ref={apartmentRef}
                      type="text"
                      className={`h-[40px]  p-[2%] border-[1px] border-[black] rounded-[2px] ${
                        isArabic ? "text-right" : ""
                      }`}
                      defaultValue={userAddress?.apartment || ""}
                      required
                    />
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
                      disabled={mutation.isLoading}
                    >
                      {mutation.isLoading
                        ? "Loading..."
                        : t("dashboard.personalInfo.save")}
                    </button>
                  </div>
                </div>
              </form>
            )}
            {(countriesLoading || userAddressLoading) && (
              <div className="h-[400px] flex justify-center items-center">
                <svg className="circular-loader" viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              </div>
            )}
            {countriesError && (
              <p>Error fetching countries: {countriesError.message}</p>
            )}
            {userAddressError && (
              <p>Error fetching user address: {userAddressError.message}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageAddress;
