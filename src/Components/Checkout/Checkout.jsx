import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import Loader from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import { useTranslation } from "react-i18next";
import { IoIosArrowRoundForward } from "react-icons/io";

function Checkout() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [currencyValue, setCurrencyValue] = useState(1);
  const currencyUsed = localStorage.getItem("currencyUsed") || "";
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState(""); // For success/error messages

  const getCountry = JSON.parse(localStorage.getItem("country")) || {};
  const [Country, setCountry] = useState([]);
  const [configureId, setConfigureId] = useState("");
  const [orderloading, setOrderLoading] = useState(false);
  const [userAddress, setUserAddress] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingApartment, setBillingApartment] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingRegion, setBillingRegion] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [billingPhoneNumber, setBillingPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);
  const [onlineLoading, setOnlineLoading] = useState(false);
  const navigate = useNavigate();
  const [loadCartItems, setLoadCartItems] = useState(false);
  const PREFIX_LENGTH = 250;
  const SUFFIX_LENGTH = 8;
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const selectedLang = localStorage.getItem("lang");
  const [isChecked, setIsChecked] = useState(true);

  const cartRefNumber = localStorage.getItem("cartNumber");
  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
      setLang(selectedLang);
    }
  }, [i18n]);

  const isArabic = lang === "ar";

  // Function to extract userId and cartId
  const extractId = (obfuscatedId) => {
    return obfuscatedId.slice(
      PREFIX_LENGTH,
      obfuscatedId.length - SUFFIX_LENGTH
    );
  };

  const obfuscatedUser = localStorage.getItem("clientInfo");
  const user = obfuscatedUser ? extractId(obfuscatedUser) : null;

  const obfuscatedCart = localStorage.getItem("cartInfo");
  const carthidden = obfuscatedCart ? extractId(obfuscatedCart) : null;
  // Function to extract userId and cartId

  // Fetching user's and guest's cart items
  const getProductsInCart = async () => {
    setLoadCartItems(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/cartItems-checkout/${cartRefNumber}`,
        {
          params: { locale: selectedLang },
        }
      );
     
      setCartItems(res.data);
      setTotal(res.data.total);
      setSubtotal(res.data.subtotal);
      setShippingFee(res.data.shippingFee);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
    setLoadCartItems(false);
  };

  useEffect(() => {
    getProductsInCart();
  }, []);
  // Fetching user's and guest's cart items

  // Fetching currency value when selecting a new currency
  useEffect(() => {
    const fetchCurrencyValue = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/currency-name",
          {
            currency_name: currencyUsed,
          }
        );
        setCurrencyValue(response.data.currency_value);
      } catch (error) {
        console.error("Error fetching currency value:", error);
      }
    };

    fetchCurrencyValue();
  }, [currencyUsed]);
  // Fetching currency value when selecting a new currency

  // Function to handle form submission for COD and online payment
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      apartment,
      city,
      region,
      zipCode,
      note: notes,
      shippingFee,
      billing_firstName: billingFirstName,
      billing_country: billingCountry,
      billing_lastName: billingLastName,
      billing_email: billingEmail,
      billing_address: billingAddress,
      billing_apartment: billingApartment,
      billing_city: billingCity,
      billing_region: billingRegion,
      billing_zipCode: billingZipCode,
      billing_phoneNumber: billingPhoneNumber,
      status: "Open order",
      totalAmount: total,
      currency: currencyUsed,
      currencyRate: currencyValue,
      cart_id: cartRefNumber,
      shipping_country_id: getCountry.id,
      user_auth_id: user,
    };

    const buttonValue = event.nativeEvent.submitter.value;

    if (buttonValue === "online") {
      initiateCheckoutUserOnline(data);
    } else if (buttonValue === "COD") {
      try {
        setOrderLoading(true);

        const res = await axios.post("http://localhost:8000/api/order", data);
        const orderId = res.data.order.id;
        const cartId = res.data.order.cart.id;
        const cartRefNumber = res.data.order.cart.uniqueCartId;

        await axios.post("http://localhost:8000/api/payment", {
          paymentMethod: "COD",
          status: "Upcoming",
          total,
          order_id: orderId,
        });
        await axios.post(
          `http://localhost:8000/api/order-status-update/${orderId}`,
          {
            status: "Open order",
            itemStatus: "Allocated",
          }
        );

        await axios.post(
          `http://localhost:8000/api/decreaseProduct/${orderId}`
        );

        await sendConfirmationEmail(orderId, cartId);
        navigate(`/order-successful/${cartRefNumber}`);
        setOrderLoading(false);
      } catch (error) {
        console.error("Error submitting COD order:", error);
        setOrderLoading(false);
      }
    }
  };

  // Function to send confirmation email
  const sendConfirmationEmail = async (orderId, cartId) => {
    const emailInfo = {
      orderId,
      cartId,
      email,
      subtotal,
      shippingFee,
      total,
      note: notes,
      billing_firstName: billingFirstName,
      billing_lastName: billingLastName,
      billing_email: billingEmail,
      billing_country: billingCountry,
      billing_address: billingAddress,
      billing_apartment: billingApartment,
      billing_city: billingCity,
      billing_region: billingRegion,
      billing_zipCode: billingZipCode,
      billing_phoneNumber: billingPhoneNumber,
      address,
      firstName,
      lastName,
      phoneNumber,
      region,
      city,
      countryName: getCountry.name,
      zipCode,
      currencyRate: currencyValue,
      currency: currencyUsed,
      apartment,
      product: cartItems.product?.map((item) => ({
        productName: item.productName,
        size: item.pivot.size.size,
        quantity: item.pivot.quantity,
        price: item.pivot.productPrice,
        productSKU: item.productSKU,
        media1: item.media1,
      })),
    };
    try {
      await axios.post(
        "http://localhost:8000/api/orderConfirmation",
        emailInfo
      );
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setBillingFirstName(firstName);
      setBillingLastName(lastName);
      setBillingEmail(email);
      setBillingPhoneNumber(phoneNumber);
      setBillingAddress(address);
      setBillingApartment(apartment);
      setBillingCity(city);
      setBillingRegion(region);
      setBillingCountry(getCountry.name);
      setBillingZipCode(zipCode);
    }
  };
  useEffect(() => {
    if (isChecked) {
      setBillingFirstName(firstName);
      setBillingCountry(getCountry.name);
      setBillingLastName(lastName);
      setBillingEmail(email);
      setBillingPhoneNumber(phoneNumber);
      setBillingAddress(address);
      setBillingApartment(apartment);
      setBillingCity(city);
      setBillingRegion(region);
      setBillingZipCode(zipCode);
    }
  }, [
    isChecked,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    apartment,
    city,
    region,
    zipCode,
  ]);

  const getCountries = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/shipping-countries",
      { params: { locale: selectedLang } }
    );
    setCountry(res.data.message);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const selectedValue = e.target.value;
    setBillingCountry(selectedValue);
  };

  // To fetch User Address When Logged In

  useEffect(() => {
    if (user) {
      fetchUserAddress();
    }
  }, []);

  const fetchUserAddress = async () => {
    try {
      setLoadingUserInfo(true);
      const res = await axios.get(
        `http://localhost:8000/api/user-address/${user}`
      );
      setUserAddress(res.data.user);

      fillAddressFields(res.data.user);
    } catch (error) {
      console.error("Error fetching user address:", error);
    } finally {
      setLoadingUserInfo(false);
    }
  };

  const fillAddressFields = (userAddress) => {
    if (userAddress) {
      setFirstName(userAddress.FirstName || "");
      setLastName(userAddress.LastName || "");
      setEmail(userAddress.Email || "");
      setPhoneNumber(userAddress.phone_number || "");
      setAddress(userAddress.address || "");
      setApartment(userAddress.apartment || "");
      setCity(userAddress.city || "");
      setRegion(userAddress.region || "");
      setZipCode(userAddress.zip_code || "");
    }
  };

  // To fetch User Address When Logged In

  //Online Payment
  const initiateCheckoutUserOnline = async () => {
    setOnlineLoading(true);
    const data = {
      email,
      subtotal,
      shippingFee,
      total,
      note: notes,
      billing_firstName: billingFirstName,
      billing_country: billingCountry,
      billing_lastName: billingLastName,
      billing_email: billingEmail,
      billing_address: billingAddress,
      billing_apartment: billingApartment,
      billing_city: billingCity,
      billing_region: billingRegion,
      billing_zipCode: billingZipCode,
      billing_phoneNumber: billingPhoneNumber,
      address,
      firstName,
      lastName,
      phoneNumber,
      region,
      city,
      countryName: getCountry.name,
      zipCode,
      apartment,
      status: "Upcoming",
      totalAmount: total,
      currency: currencyUsed,
      currencyRate: currencyValue,
      cart_id: cartRefNumber,
      shipping_country_id: getCountry.id,
      user_auth_id: user,
    };
    const res = await axios.post("http://localhost:8000/api/order", data);
    const orderId = res.data.order.id;
    const apiUrl = "http://localhost:8000/api/initiate-checkout";
    const requestData = {
      orderId,
      email,
      subtotal,
      shippingFee,
      total,
      note: notes,
      address,
      firstName,
      lastName,
      phoneNumber,
      region,
      city,
      countryName: getCountry.name,
      zipCode,
      apartment,
      product: cartItems.product?.map((item) => ({
        productName: item.productName,
        size: item.pivot.size.size,
        quantity: item.pivot.quantity,
        price: item.pivot.productPrice,
        productSKU: item.productSKU,
        media1: item.media1,
      })),
    };
    const username = "merchant.TEST06107600";
    const password = "1c04f257c60207b0b17047151e611fd5";
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);

    const headers = {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Cache-Control": "no-cache",
    };

    try {
      const response = await axios.post(apiUrl, requestData, { headers });
      const test = response.data.session;
      setConfigureId(test);
    } catch (error) {
      console.error("Error during Creating Checkout:", error);
    }
    setOnlineLoading(false);
  };

  if (configureId.updateStatus === "SUCCESS") {
    window.Checkout.configure({
      session: {
        id: configureId.id,
        version: configureId.version,
      },
    });
    window.Checkout.showPaymentPage();
  }

  //Online Payment

  const handlePromoCode = async (e) => {
    e.preventDefault(); // Prevent page from refreshing on form submission

    try {
      const res = await axios.post(
        `http://localhost:8000/api/cart/${carthidden}/apply-promo`,
        {
          promo_code: promoCode, // Correct key-value pairing for the promo code
        }
      );

      getProductsInCart();
      // Update the message and total based on response

      setMessage(res.data.message);
    } catch (err) {
      // Handle errors (e.g., invalid promo code, network issues)
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {orderloading || onlineLoading ? (
        <div className="text-[18px] md:text-[15px] gap-[5%] h-[70vh] w-[100%] flex  flex-col justify-center items-center">
          <img
            className="w-[50px] h-[110px]"
            src={Loader}
            alt="parrot-loader"
          ></img>
          <p className="w-[400px] md:w-[100%] md:p-[5%] text-center">
            {t("checkout.redirectTitle")}
          </p>
          <p>
            <strong> {t("checkout.thankYou")}</strong>
          </p>
        </div>
      ) : (
        <div className="px-[6%] xl:px-[1%] py-[2%] w-[100%] h-[auto] ">
          <div className="flex flex-col  sm:justify-start sm:gap-[2%] h-[100%] w-[100%]">
            <div
              className={`pl-[3%]   ${isArabic ? "text-right pr-[3%]" : ""}`}
            >
              <div
                className={`h-[30px] flex w-[100%] ${
                  isArabic ? "justify-end" : "justify-start"
                }`}
              >
                <Link to="/cart">
                  <div className="border-[0.5px] border-[black] rounded-full w-[100%] h-[100%] hover:border-[#E79E7F] cursor-pointer">
                    {isArabic ? (
                      <IoIosArrowRoundForward className="w-[100%] h-[100%] hover:text-[#E79E7F]" />
                    ) : (
                      <IoIosArrowRoundBack className="w-[100%] h-[100%] hover:text-[#E79E7F]" />
                    )}
                  </div>
                </Link>
              </div>
              <h1 className="text-[40px] md:w-[100%] font-[FahKwang] xl:text-[35px] md:text-[25px] sm:text-[20px]">
                {t("cart.checkout")}{" "}
              </h1>
            </div>
            <div className="h-[fit-content]  px-[3.5%]">
              {/* <div className="bg-[white]  w-[29%] mb-[1%] p-[1%]">
                
              <p className="font-[FahKwang] text-[20px] pb-[1%]">PROMO CODE</p>
    
              <form onSubmit={handlePromoCode} className="flex gap-[2%] w-[100%]">
      
                    <input 
                      className="bg-[#f3f3f3] w-[100%] px-[2%]" 
                      value={promoCode} 
                      onChange={(e) => setPromoCode(e.target.value)} // Update state as user types
                      placeholder="Enter promo code"
                    />
      
                    <button type="submit" className="p-[2%] bg-[#676F98] text-white">
                      APPLY
                    </button>
                </form>
              {message && <p>{message}</p>}
            
            </div> */}
            </div>
            <form
              className={`flex justify-evenly lg:flex-col${
                isArabic ? " flex-row-reverse text-right" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <div className="bg-[white] px-[5%] xl:px-[2%] py-[1%] relative rounded-[2px] h-[auto] w-[55%] lg:w-[100%]">
                <div className="pb-[1%] w-[100%]">
                  <p className="font-[FahKwang] text-[20px]">
                    {t("checkout.shippingAddress")}
                  </p>
                  {loadingUserInfo && (
                    <div className=" absolute w-[90%] xl:w-[95%] lg:w-[97%] py-[1%] h-[90%] bg-[#8080802a] flex justify-center items-center">
                      <svg className="circular-loader" viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col justify-between w-[100%]">
                  <div className="flex justify-start flex-col w-[49%] sm:w-[100%]">
                    <label
                      className={`h-[30px] flex items-center text-[15px] ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.firstName")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                        isArabic ? " text-right" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="flex justify-start flex-col w-[49%] sm:w-[100%]">
                    <label
                      className={`h-[30px] flex items-center text-[15px] ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.lastName")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className={`h-[4.5vh]  p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                        isArabic ? " text-right" : ""
                      }`}
                      required
                    />
                  </div>
                </div>
                <div className="flex sm:flex-col justify-between w-[100%]">
                  <div className="flex justify-start flex-col w-[49%] sm:w-[100%]">
                    <label
                      className={`h-[30px] flex items-center text-[15px] ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.login.email")}
                      <span className="text-[#E79E7F]  mt-[-1%]"> *</span>{" "}
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                        isArabic ? " text-right" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="w-[49%] sm:w-[100%]">
                    <label
                      className={`h-[30px] flex items-center text-[15px] ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.phone")}
                      <span className="text-[#E79E7F] mt-[-1%]">*</span>
                    </label>
                    <div className="">
                      <div className="">
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
                  </div>
                </div>
                <div className=" flex flex-col  justify-between">
                  <div className="flex justify-start flex-col w-[100%] ">
                    <label
                      className={`h-[30px] flex items-center text-[15px] ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.address")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      value={address}
                      placeholder={isArabic ? "عنوان الشارع" : "Street Address"}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                        isArabic ? " text-right" : ""
                      }`}
                      required
                    />
                    <input
                      value={apartment}
                      placeholder={
                        isArabic
                          ? "شقة، جناح، وحدة، مبنى، طابق، إلخ"
                          : "Apt, suite, unit, building, floor, etc."
                      }
                      onChange={(e) => setApartment(e.target.value)}
                      type="text"
                      className={`h-[4.5vh] mt-[1%] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                        isArabic ? " text-right" : ""
                      }`}
                      required
                    />
                  </div>
                </div>
                <div className=" flex sm:flex-col justify-between">
                  <div className="flex  justify-start flex-col w-[49%] sm:w-[100%]">
                    <label
                      className={`h-[30px] flex items-center text-[15px] ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.city")}{" "}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                        isArabic ? " text-right" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="flex  justify-start flex-col w-[49%] sm:w-[100%]">
                    <label
                      className={`h-[30px] flex items-center text-[15px] ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.region")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>{" "}
                    </label>
                    <input
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      type="text"
                      className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                        isArabic ? " text-right" : ""
                      }`}
                      required
                    />
                  </div>
                </div>
                <div className="flex sm:flex-col justify-between w-[100%]">
                  <div className="flex justify-start flex-col w-[49%] sm:w-[100%]">
                    <label
                      className={`h-[30px] flex items-center text-[15px] ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.country")}
                      <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                    </label>
                    <div className="h-[4.5vh]  p-[2%] border-[1px] border-[black] rounded-[2px] bg-[#E8F0FE]">
                      {getCountry.name}
                    </div>
                  </div>
                  <div className="flex justify-start flex-col w-[49%] sm:w-[100%]">
                    <label
                      className={`h-[30px] flex items-center text-[15px] ${
                        isArabic ? "flex-row-reverse text-[16px]" : ""
                      }`}
                    >
                      {t("Authentication.signUp.zipCode")}
                    </label>
                    <input
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      type="text"
                      className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                        isArabic ? " text-right" : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="flex  justify-start flex-col w-[100%]">
                  <label
                    className={`h-[30px] flex items-center text-[15px] ${
                      isArabic ? "flex-row-reverse text-[16px]" : ""
                    }`}
                  >
                    {t("checkout.notes")}
                  </label>
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    type="text"
                    className={`h-[5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                      isArabic ? " text-right" : ""
                    }`}
                  />
                </div>

                <div className={`py-[2%] w-[100%] ${isArabic ? "flex" : ""}`}>
                  <input
                    type="checkbox"
                    name="billingAddress"
                    value=" "
                    defaultChecked
                    id="customCheckbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="customCheckbox"
                    className="custom-checkbox-label font-[FahKwang] text-[20px] px-[1%]"
                  >
                    {t("checkout.billing")}
                  </label>
                </div>
                {!isChecked && (
                  <>
                    <div className="flex sm:flex-col justify-between w-[100%]">
                      <div className="flex justify-start flex-col w-[49%] sm:w-[100%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse text-[16px]" : ""
                          }`}
                        >
                          {t("checkout.billingFirstName")}
                          <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                        </label>
                        <input
                          value={billingFirstName}
                          onChange={(e) => setBillingFirstName(e.target.value)}
                          type="text"
                          className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                            isArabic ? " text-right" : ""
                          }`}
                          required
                        />
                      </div>
                      <div className="flex justify-start flex-col w-[49%] sm:w-[100%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse text-[16px]" : ""
                          }`}
                        >
                          {t("checkout.billingLastName")}
                          <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                        </label>
                        <input
                          value={billingLastName}
                          onChange={(e) => setBillingLastName(e.target.value)}
                          type="text"
                          className={`h-[4.5vh]  p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                            isArabic ? " text-right" : ""
                          }`}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex sm:flex-col justify-between w-[100%]">
                      <div className="flex justify-start flex-col w-[49%] sm:w-[100%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse text-[16px]" : ""
                          }`}
                        >
                          {t("checkout.billingEmail")}
                          <span className="text-[#E79E7F]  mt-[-1%]">
                            {" "}
                            *
                          </span>{" "}
                        </label>
                        <input
                          value={billingEmail}
                          onChange={(e) => setBillingEmail(e.target.value)}
                          type="email"
                          className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                            isArabic ? " text-right" : ""
                          }`}
                          required
                        />
                      </div>
                      <div className="w-[49%] sm:w-[100%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse text-[16px]" : ""
                          }`}
                        >
                          {t("checkout.billingPhone")}
                          <span className="text-[#E79E7F] mt-[-1%]">*</span>
                        </label>

                        <div className="">
                          <PhoneInput
                            className="bg-transparent border-[0.5px] border-[black] px-[2%] rounded-[2px] w-[100%] countryCode"
                            international
                            required
                            countryCallingCodeEditable={false}
                            defaultCountry="LB"
                            value={billingPhoneNumber}
                            onChange={setBillingPhoneNumber}
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" flex sm:flex-col  justify-between">
                      <div className="flex justify-start flex-col w-[100%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse text-[16px]" : ""
                          }`}
                        >
                          {t("checkout.billingAddress")}
                          <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                        </label>
                        <input
                          value={billingAddress}
                          onChange={(e) => setBillingAddress(e.target.value)}
                          placeholder={
                            isArabic ? "عنوان الشارع" : "Street Address"
                          }
                          type="text"
                          className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                            isArabic ? " text-right" : ""
                          }`}
                          required
                        />
                        <input
                          value={billingApartment}
                          onChange={(e) => setBillingApartment(e.target.value)}
                          placeholder={
                            isArabic
                              ? "شقة، جناح، وحدة، مبنى، طابق، إلخ"
                              : "Apt, suite, unit, building, floor, etc."
                          }
                          type="text"
                          className={`h-[4.5vh] p-[2%] mt-[1%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                            isArabic ? " text-right" : ""
                          }`}
                          required
                        />
                      </div>
                    </div>
                    <div className=" flex sm:flex-col justify-between">
                      <div className="flex  justify-start flex-col w-[49%] sm:w-[100%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse text-[16px]" : ""
                          }`}
                        >
                          {t("checkout.billingCity")}{" "}
                          <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                        </label>
                        <input
                          value={billingCity}
                          onChange={(e) => setBillingCity(e.target.value)}
                          type="text"
                          className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                            isArabic ? " text-right" : ""
                          }`}
                          required
                        />
                      </div>
                      <div className="flex  justify-start flex-col w-[49%] sm:w-[100%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse text-[16px]" : ""
                          }`}
                        >
                          {t("checkout.billingRegion")}
                          <span className="text-[#E79E7F]  mt-[-1%]">
                            *
                          </span>{" "}
                        </label>
                        <input
                          value={billingRegion}
                          onChange={(e) => setBillingRegion(e.target.value)}
                          type="text"
                          className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                            isArabic ? " text-right" : ""
                          }`}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex sm:flex-col justify-between w-[100%]">
                      <div className="flex  justify-start flex-col w-[49%] sm:w-[100%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse text-[16px]" : ""
                          }`}
                        >
                          {t("checkout.billingCountry")}{" "}
                          <span className="text-[#E79E7F]  mt-[-1%]">*</span>
                        </label>
                        <select
                          className={`custom-select cursor-pointer h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                            isArabic ? "text-right" : ""
                          }`}
                          value={billingCountry}
                          onChange={handleCountryChange}
                        >
                          {Country.map((count) => (
                            <option key={count.id} value={count.country_name}>
                              {count.country_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex justify-start flex-col w-[49%] sm:w-[100%]">
                        <label
                          className={`h-[30px] flex items-center text-[15px] ${
                            isArabic ? "flex-row-reverse text-[16px]" : ""
                          }`}
                        >
                          {t("checkout.billingZipCode")}
                        </label>
                        <input
                          value={billingZipCode}
                          onChange={(e) => setBillingZipCode(e.target.value)}
                          type="text"
                          className={`h-[4.5vh] p-[2%] bg-[#F1F5FF] border-[0.5px] border-[black] rounded-[2px] ${
                            isArabic ? " text-right" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="lg:w-[100%] h-[fit-content] w-[35%] relative ">
                {loadCartItems && (
                  <div className="w-[100%] px-[1%] flex justify-center items-center h-[90%] bg-[#a5a5a554] top-[10%] absolute">
                    <svg className="circular-loader" viewBox="25 25 50 50">
                      <circle r="20" cy="50" cx="50"></circle>
                    </svg>
                  </div>
                )}

                <div className=" bg-white px-[5%] xl:px-[2%] py-[3%] flex flex-col justify-between rounded-[2px] h-[100%]  w-[100%]">
                  <div className="w-[100%]">
                    <p className="font-[FahKwang] pb-[3%] text-[20px]">
                      {t("checkout.cartItems")}
                    </p>
                  </div>
                  <div className="overflow-auto h-[250px] ">
                   
                    {cartItems.product?.map((prodInfo) => (
                      <>
                        {prodInfo.importantNote && (
                          <p className="text-[12px] text-[red]">
                            {prodInfo.importantNote}
                          </p>
                        )}
                        <div
                          key={prodInfo.pivot.size_id}
                          className={`border-b-[1px] h-[130px] border-[#e0e0e054] flex justify-between items-center ${
                            isArabic ? " flex-row-reverse" : ""
                          }`}
                        >
                     
                          <div
                            className={`flex ${
                              isArabic ? " flex-row-reverse" : ""
                            }`}
                          >
                            <div className="w-[80px] h-[100px]">
                              <img
                                src={`http://localhost:8000/api/storage/${prodInfo.media1}`}
                                className="h-[100%] w-[100%] object-contain"
                                alt=""
                              />
                            </div>
                            <div className="flex justify-center flex-col">
                              <p>{prodInfo.productName}</p>
                              <p>{prodInfo.pivot.size.size}</p>
                              {prodInfo.productSale && (
                                <p className=" text-[#E79E7F]">
                                  {prodInfo.productSale}% OFF
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="font-[600]">
                              x{prodInfo.pivot.quantity}
                            </p>
                          </div>
                          <div>
                            <p className="font-[600]">
                              {(
                                prodInfo.pivot.productPrice *
                                currencyValue *
                                prodInfo.pivot.quantity
                              ).toFixed(2)}{" "}
                              {currencyUsed}
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="w-[100%]  ">
                    <div
                      className={`flex justify-between items-center h-[50px]  ${
                        isArabic ? "flex-row-reverse" : ""
                      }`}
                    >
                      <p className="text-[15px]">{t("cart.subtotal")}</p>
                      <p className="font-[600]">
                        {(subtotal * currencyValue).toFixed(2)} {currencyUsed}
                      </p>
                    </div>
                    <div
                      className={`flex justify-between items-center h-[50px] ${
                        isArabic ? "flex-row-reverse" : ""
                      }`}
                    >
                      <p className="text-[15px]"> {t("cart.shippingFee")}</p>
                      <p className="font-[600]">
                        {(shippingFee * currencyValue).toFixed(2)}{" "}
                        {currencyUsed}
                      </p>
                    </div>
                    <p className="text-[red]">{t("checkout.cartNote")}</p>
                    <div
                      className={`border-t-[1px] border-[#bbbbbb] flex justify-between items-center h-[auto] py-[3%]  ${
                        isArabic ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex justify-between items-center w-[150px] ${
                          isArabic ? "flex-row-reverse" : ""
                        } `}
                      >
                        <p className="text-[15px]">{t("cart.total")}</p>
                        <div className="w-[90px]">
                          <img
                            src="https://www.netcommercepay.com/logo/NCseal_M.gif"
                            alt="NC Seal"
                          />
                        </div>
                      </div>
                      <p className="font-[600]">
                        {(total * currencyValue).toFixed(2)} {currencyUsed}
                      </p>
                    </div>
                  </div>
                  <div className="w-[100%] h-[50px]  flex justify-between items-end">
                    {cartItems.shipping_country_id === 109 ? (
                      <button
                        className="w-[100%] h-[100%]  hover:bg-[#2f4672] bg-[#676f98] font-[FahKwang] hover:text-[#E79E7F] text-white text-[1vw] xl:text-[15px]"
                        type="submit"
                        value="COD"
                        disabled={orderloading || onlineLoading}
                      >
                        {orderloading ? "Loading..." : t("checkout.cod")}
                      </button>
                    ) : (
                      <button
                        className="w-[100%] h-[100%]  hover:bg-[#2f4672] bg-[#676f98] font-[FahKwang] hover:text-[#E79E7F] text-white text-[1vw] xl:text-[15px]"
                        type="submit"
                        value="online"
                        disabled={orderloading || onlineLoading}
                      >
                        {onlineLoading
                          ? "Loading..."
                          : t("checkout.onlinePayment")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
