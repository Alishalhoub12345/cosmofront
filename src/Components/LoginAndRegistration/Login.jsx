import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginImage from "../../images/Authentication/login-bag.png";
import axios from "axios";
import { IoEyeOffOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [loader, setLoader] = useState(false);

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

  const handleOpenPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleClosePassword = () => {
    setOpenForgotPassword(false);
  };

  const generateRandomString = (length) => {
    const characters =
      "ABC3253526790-DEFGHIJ@$%&^*8345789NOP()!&@QRSTXYZabcdijklmnopqrstuvwxyz0123456789 @$#%!";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const obfuscateUserId = (userId) => {
    const prefix = generateRandomString(250);
    const suffix = generateRandomString(8);
    return `${prefix}${userId}${suffix}`;
  };

  const obfuscateCartId = (cartId) => {
    const prefix = generateRandomString(250);
    const suffix = generateRandomString(8);
    return `${prefix}${cartId}${suffix}`;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoader(true);
    const res = await axios.post(
      "https://www.cosmo.global/laravel/api/reset-password-email",
      {
        email: forgotPasswordEmail,
      }
    );
    setEmailStatus(res.data.message);
    setLoader(false);
  };

 const handleLogin = (event) => {
  event.preventDefault();

  if (!email || !password) {
    setError("Please fill in both email and password fields.");
    return;
  }

  setError("");
  setLoading(true);

  axios
    .post("https://www.cosmo.global/laravel/api/login-user-check", {
      email: email,
      Password: password,
    })
    .then((response) => {
      const user = response.data.user;

      // Check if user exists and response is successful
      if (response.status === 200 && user) {
        // ✅ Check status first
        if (user.status.toLowerCase() !== "active") {
          setError("Your account is not active.");
          setLoading(false);
          return;
        }

        // Proceed only if user is active
        const obfuscatedUserId = obfuscateUserId(user.id);
        localStorage.setItem("clientInfo", obfuscatedUserId);
        localStorage.setItem("firstName", user.FirstName);
        localStorage.removeItem("cartInfo");
        localStorage.removeItem("cart");
        localStorage.removeItem("cartLength");

        axios
          .get(`https://www.cosmo.global/laravel/api/cart/${user.id}/latest-cart`)
          .then((cartResponse) => {
            if (
              cartResponse.data &&
              cartResponse.data.cart &&
              Array.isArray(cartResponse.data.cart.product)
            ) {
              const formattedCart = cartResponse.data.cart.product.map(
                (product) => ({
                  productId: String(product.id),
                  selectedSize: String(product.sizeDetails.id),
                  quantity: product.pivot.quantity,
                })
              );

              const totalQuantities = formattedCart.reduce(
                (total, item) => total + item.quantity,
                0
              );

              localStorage.setItem("cartLength", totalQuantities.toString());
              localStorage.setItem("cart", JSON.stringify(formattedCart));

              const obfuscatedCartId = obfuscateCartId(
                cartResponse.data.cart.id.toString()
              );
              localStorage.setItem("cartInfo", obfuscatedCartId);
              localStorage.setItem(
                "cartNumber",
                cartResponse.data.cart.uniqueCartId
              );
              window.dispatchEvent(new Event("storage"));

              navigate("/");
            } else {
              // Cart data is missing or invalid
              localStorage.setItem("cart", JSON.stringify([]));
              navigate("/");
            }
          })
          .catch((cartError) => {
            console.error("Failed to fetch cart:", cartError);
            setError("Failed to fetch cart data. Please try again.");
            navigate("/");
          });
      } else {
        setError("Error in login process.");
        setLoading(false);
      }
    })
    .catch((error) => {
      let errorMessage = "An error occurred during login.";

      if (error.response && error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        errorMessage = "Invalid email or password.";
      } else if (error.response && error.response.status === 405) {
        errorMessage =
          "For security reasons, you should reset the password.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again.";
      }

      setError(errorMessage);
      setLoading(false);
    });
};



  return (
    <>
      {openForgotPassword && (
        <div className="flex flex-col items-center justify-center h-[350px] lg:h-[300px] sm:h-[250px] w-[40%] xl:w-[60%] md:w-[90%] md:left-[5%] xl:left-[20%] absolute top-[30%] left-[30%] z-[2] bg-white">
          <div className="absolute right-[2%] top-[5%]">
            <AiOutlineClose
              className="text-[20px] hover:text-[#082252] cursor-pointer"
              onClick={handleClosePassword}
            />
          </div>
          <div className="w-[100%] lg:w-[90%] text-center">
            <h1 className="font-[FahKwang] text-[30px] md:text-[15px]">
              {t("Authentication.ForgotPass.title")}
            </h1>
            <p className="md:text-[12px]">
              {t("Authentication.ForgotPass.desc")}
            </p>
          </div>
          <form
            className="w-[62%] xl:w-[80%] flex flex-col justify-evenly h-[50%]"
            onSubmit={handleForgotPassword}
          >
            <div className="flex justify-start flex-col">
              <label
                className={`h-[30px] flex items-center  ${
                  isArabic ? "flex-row-reverse" : ""
                }`}
              >
                {t("Authentication.login.email")}
                <span className="text-[#082252] font-bold mt-[-1%]"> *</span>
              </label>
              <input
                type="email"
                className={`h-[40px] sm:h-[30px] p-[2%] border-[1px] border-[black] rounded-[2px] ${
                  isArabic ? " text-right" : ""
                }`}
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
              />
            </div>
            {emailStatus && (
              <p className="text-[#082252] text-[12px]">{emailStatus}</p>
            )}
            <div className="w-[100%] flex justify-center items-center">
              <button
                type="submit"
                className="h-[40px] w-[200px] text-white
                bg-[#676f98] hover:bg-[#2f4672] hover:text-[#082252]"
                disabled={loader}
              >
                {loader
                  ? "Loading..."
                  : t("Authentication.ForgotPass.resetbtn")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div
        className={`w-[100%] lg:h-[auto]  h-[90vh] flex-wrap font-[FrutigerLTCom-Roman] flex items-center justify-center bg-[#EEEEEE] ${
          isArabic ? "flex-row-reverse text-right" : ""
        }`}
      >
        <div className="w-[50%] lg:w-[80%] sm:w-[90%] h-[100%] lg:h-[auto] p-[5%] xl:px-[0%] flex justify-center items-center flex-col">
          <div className="w-[80%]  xl:w-[100%] h-[100%] flex justify-start items-center flex-col">
            <div className="w-[80%] lg:w-[95%]">
              <h1 className="font-[FahKwang] text-[40px] xl:text-[30px]  lg:w-[100%]   md:text-[6.5vw] text-[#082252]">
                {t("Authentication.login.title")}
              </h1>
              <p className="text-[15px] sm:text-[12px] text-[#082252]">
                {t("Authentication.login.desc")}
              </p>
            </div>
            <form
              className="w-[80%] lg:w-[95%] h-[380px] lg:h-[300px] flex justify-evenly flex-col text-[#082252]"
              onSubmit={handleLogin}
            >
              <div className="h-[150px] flex flex-col justify-between">
                <div className="flex justify-start flex-col">
                  <label
                    className={` h-[30px] flex  items-center ${
                      isArabic ? " flex-row-reverse text-[15px]" : ""
                    }`}
                  >
                    {t("Authentication.login.email")}
                    <span className="text-[#082252]  mt-[-1%]"> *</span>
                  </label>
                  <input
                    type="email"
                    className={`h-[40px] p-[2%] bg-[#EEEEEE] border-[1px] border-[black] rounded-[2px] ${
                      isArabic ? "text-right" : ""
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-start flex-col pt-[1%] relative">
                  <label
                    className={` h-[30px] flex  items-center ${
                      isArabic ? " flex-row-reverse text-[15px]" : ""
                    }`}
                  >
                    {t("Authentication.login.pass")}
                    <span className="text-[#082252] mt-[-1%]">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`h-[40px] p-[2%] bg-[#EEEEEE] border-[1px] border-[black] rounded-[2px]  ${
                      isArabic ? " flex text-right" : "pr-[30px]"
                    }`}
                    value={password}
                    autoComplete="pass"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <IoEyeOffOutline
                      className={`absolute hover:font-bold cursor-pointer ${
                        isArabic
                          ? "top-[50%] left-[10px]"
                          : "right-[10px] top-[55%] transform translate-y-[-50%]"
                      }`}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiOutlineEye
                      className={`absolute hover:text-[#082252] cursor-pointer ${
                        isArabic
                          ? "top-[50%] left-[10px]"
                          : "right-[10px] top-[55%] transform translate-y-[-50%]"
                      }`}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                  <div className="w-[100%] pt-[1%] flex justify-end">
                    <p
                      onClick={handleOpenPassword}
                      className="text-right text-[12px] text-[#1e335a] hover:underline underline-offset-1 cursor-pointer"
                    >
                      {t("Authentication.login.forgot")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between flex-col h-[80px]">
                <button
                  className=" w-[100%] h-[40px] text-white
                  bg-[#3f4771] hover:bg-[#082252]"
                  disabled={loading}
                >
                  {loading ? "Loading..." : t("Authentication.login.loginBtn")}
                </button>
                {error && <p className="text-[#EEEEEE] font-semibold text-[12px]">{error}</p>}
                <p className="text-[12px] text-[#1e335a]">
                  {t("Authentication.login.noAccnt")}
                  <Link
                    to="/signup-account"
                    className="font-[700]  hover:underline underline-offset-1"
                  >
                    {t("Authentication.login.sign")}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[50%] lg:w-[75%] h-[100%] md:hidden ">
          <img
            src={loginImage}
            alt="login"
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
