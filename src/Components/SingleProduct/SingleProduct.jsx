import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { IoIosCheckmark } from "react-icons/io";
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
import Loader from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import saleFlag from "../../images/Products/sales-flag-blue.png";
import { useTranslation } from "react-i18next";

function SingleProduct() {
  const { productSKU } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantityForAcc, setQuantity] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [swiperDirection, setSwiperDirection] = useState("vertical");
  const [swiperModules, setSwiperModules] = useState([Mousewheel, Pagination]);
  const [popUpInfo, setPopUpInfo] = useState({});
  const [isMaxQuantityReached, setIsMaxQuantityReached] = useState(false);
  const [currencyValue, setCurrencyValue] = useState(1);
  const currencyUsed = localStorage.getItem("currencyUsed");
  const [t, i18n] = useTranslation("global");
  const [sizetoChoose, setSizeToChoose] = useState(false);
  const selectedLang = localStorage.getItem("lang");
  const isArabic = localStorage.getItem("lang") === "ar";
  const [loadAddToCart, setLoadAddToCart] = useState(false);
  const [loadingSizeType, setLoadingSizeType] = useState(false);
const rawLocation = localStorage.getItem("location");
const location = rawLocation ? JSON.parse(rawLocation) : null;
  const handleSizeClick = (sizeId) => {
    const size = productData.sizes.find((prodSize) => prodSize.id === sizeId);
    setSelectedSize(sizeId);
    setSelectedQuantity(size?.quantity);
  };

  useEffect(() => {
    const currencyUsed = localStorage.getItem("currencyUsed");
    if (currencyUsed) {
      axios
        .post("http://localhost:8000/api/currency-name", {
          currency_name: currencyUsed,
        })
        .then((response) => {
          setCurrencyValue(response.data.currency_value);
        })

        .catch((error) => {
          console.error("Error fetching currency value:", error);
        });
    }
  }, []);

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

  const obfuscateCartId = (cartId) => {
    const prefix = generateRandomString(250);
    const suffix = generateRandomString(8);
    return `${prefix}${cartId}${suffix}`;
  };

  const extractCartId = (obfuscatedCartId) => {
    return obfuscatedCartId.slice(
      PREFIX_LENGTH,
      obfuscatedCartId.length - SUFFIX_LENGTH
    );
  };

  const obfuscatedCart = localStorage.getItem("cartInfo");
  const carthidden = obfuscatedCart ? extractCartId(obfuscatedCart) : null;

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery(["product", productSKU], async () => {
    const res = await axios.get(
      `http://localhost:8000/api/getAllproductInfo/${productSKU}`,
      {
        params: { locale: selectedLang },
      }
    );

    setQuantity(res.data.product.productQuantity);
    setSizes(res.data.product.sizes);
    return res.data.product;
  });

  const setImageChange = (imageUrl) => {
    setImageUrl(imageUrl);
  };

  const handleStoreInLS = async () => {
    setLoadAddToCart(true);
    const quantity = 1;
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartNumber = localStorage.getItem("cartNumber") || [];
    const productId = productData.id;
    let sizeInfo;
    let existingItemIndex;

    // Determine size or default to first size for accessories
    if (quantityForAcc == null) {
      sizeInfo = sizes.find((size) => size.id === parseInt(selectedSize, 10));

      existingItemIndex = existingCart.findIndex(
        (item) =>
          item.productId === productId && item.selectedSize === selectedSize
      );
    } else {
      sizeInfo = productData.sizes[0]; // Default to the first size for accessories
      existingItemIndex = existingCart.findIndex(
        (item) => item.productId === productId
      );
    }

    const maxQuantity = sizeInfo ? parseInt(sizeInfo.quantity, 10) : 0;

    // Fetch product details for pop-up display
    const productDetails = await axios.get(
      `http://localhost:8000/api/getAllproductInfo/${productSKU}`,
      { params: { locale: selectedLang } }
    );

    // If the product already exists in the cart
    if (existingItemIndex !== -1) {
      const existingItem = existingCart[existingItemIndex];

      // Check if the quantity can still be increased
      if (existingItem.quantity < maxQuantity) {
        existingItem.quantity += quantity;

        // Ensure that the quantity does not exceed the maximum limit
        if (existingItem.quantity >= maxQuantity) {
          existingItem.quantity = maxQuantity;
          setIsMaxQuantityReached(true);
        } else {
          setIsMaxQuantityReached(false);
        }
      }
    } else {
      // If the product is not in the cart, add it
      let newCartItem;
      if (quantity <= maxQuantity) {
        if (quantityForAcc == null) {
          newCartItem = { productId, productSKU, selectedSize, quantity };
        } else {
          newCartItem = {
            productId,
            productSKU,
            selectedSize: productData.sizes[0].id,
            quantity,
          };
        }

        existingCart.push(newCartItem);
        setIsMaxQuantityReached(quantity === maxQuantity);
      }
    }

    // Store in the user's cart if authenticated

const userId = {
  user_auth_id: user,
  status: "Added To Cart",
  cartId: cartNumber,
  ipAddress: location?.ip || "unknown",
  region: location?.country?.name || "unknown",
  city: location?.city?.name || "unknown",
  products: [
    {
      product_id: productId,
      quantity: quantity,
      size_id:
        quantityForAcc == null ? selectedSize : productData.sizes[0].id,
      productPrice: productDetails
        ? productDetails.data.product.productSale &&
          productDetails.data.product.productSale !== 0
          ? (
              productDetails.data.product.productPrice *
              (1 - productDetails.data.product.productSale / 100)
            ).toFixed(2)
          : productDetails.data.product.productPrice
        : 0,
    },
  ],
};


   
    const res = await axios.post(
      "http://localhost:8000/api/add-cart-for-all",
      userId
    );
    setPopUpInfo(productDetails.data.product);
    setShowPopUp(true);
    setTimeout(() => {
      setShowPopUp(false);
    }, 800000);

    if (!carthidden) {
      const obfuscatedCartId = obfuscateCartId(res.data.cart.id);
      localStorage.setItem("cartInfo", obfuscatedCartId);
    }
    localStorage.setItem("cartNumber", res.data.cart.uniqueCartId);
    setLoadAddToCart(false);

    // Update localStorage with the new cart state
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Update cart length in localStorage
    const totalQuantities = existingCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    localStorage.setItem("cartLength", totalQuantities);
    window.dispatchEvent(new Event("storage"));
  };

  const chooseSize = () => {
    setSizeToChoose(true);
  };

  const closePopup = () => {
    setShowPopUp(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setSwiperDirection("horizontal");
        setSwiperModules([Navigation, Pagination]);
      } else {
        setSwiperDirection("vertical");
        setSwiperModules([Mousewheel, Pagination, Navigation]);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const checkQuantity = (existingItem, maxQuantity) => {
      if (existingItem && existingItem.quantity >= maxQuantity) {
        setIsMaxQuantityReached(true);
      } else {
        setIsMaxQuantityReached(false);
      }
    };

    if (quantityForAcc == null) {
      const sizeInfo = sizes.find(
        (size) => size.id === parseInt(selectedSize, 10)
      );
      const maxQuantity = sizeInfo ? parseInt(sizeInfo.quantity, 10) : 0;

      const existingItem = existingCart.find(
        (item) =>
          item.productSKU === productSKU && item.selectedSize === selectedSize
      );

      checkQuantity(existingItem, maxQuantity);
    } else {
      const maxQuantity = sizes[0]?.quantity || 0;

      const existingItem = existingCart.find(
        (item) => item.productSKU === productSKU
      );

      checkQuantity(existingItem, maxQuantity);
    }
  }, [selectedSize, sizes, productSKU, quantityForAcc]);

  const handleMouseMove = (e) => {
    const image = document.getElementById("productImage");
    const { left, top, width, height } = image.getBoundingClientRect();

    // Get mouse position relative to the image
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Set the transform origin based on mouse position
    image.style.transformOrigin = `${x * 100}% ${y * 100}%`;

    // Use scale for zoom
    image.style.transform = "scale(2.2)"; // Set scale for zoom, adjust 2 to your desired zoom level
  };

  const resetZoom = () => {
    const image = document.getElementById("productImage");
    image.style.transform = "scale(1)"; // Reset the zoom
  };

  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="">
      {popUpInfo && showPopUp && (
        <div
          className={` popup w-[300px] fixed right-[2%] bg-[#FFFFFF] top-[15%] z-[20] h-[200px] ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <div className="h-[80%] flex justify-evenly">
            <div
              className={`h-[100%] w-[50%] justify-evenly items-center flex ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <div className="flex justify-center items-center h-[100%]">
                <IoIosCheckmark className="text-[30px] rounded-full bg-[#676F98] text-white" />
              </div>
              <div className=" w-[80px] flex justify-center items-center">
                <img
                  src={`http://localhost:8000/api/storage/${popUpInfo.media1}`}
                  alt={`${popUpInfo.id}`}
                  className="w-[100%] h-[100%]"
                />
              </div>
            </div>
            <div className="  flex justify-center flex-col">
              <p
                className={` text-[12px] ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {popUpInfo.productName} {t("addedToCart")}
              </p>
              <p></p>
            </div>
          </div>
          <div className=" flex justify-evenly text-[12px]">
            <button onClick={closePopup} className="hover:text-[#E79E7F]">
              {" "}
              {t("continue")}
            </button>
            <Link to="/cart" className="hover:text-[#E79E7F]">
              {t("viewCart")}
            </Link>
          </div>
        </div>
      )}

      {isLoading || loading ? (
        <div className="flex justify-center items-center h-[100vh] lg:h-[auto] w-[100%]">
          <img
            className="w-[50px] md:w-[25px]"
            src={Loader}
            alt="parrot-loader"
          ></img>
        </div>
      ) : (
        <div className="  font-[FrutigerLTCom-Roman] h-[auto] mb-[5%]">
          <div className="flex px-[3%] mt-[2%] gap-[3%] justify-center items-start lg:items-center flex-row lg:flex-col w-[100%]">
            <div
              className={`flex h-[100%] gap-[0.2%] justify-center items-start flex-row lg:flex-col  lg:w-[100%] lg:mb-4 ${
                swiperDirection === "horizontal" ? "w-full" : ""
              }`}
            >
              <Swiper
                direction={swiperDirection}
                spaceBetween={2}
                mousewheel={swiperModules.includes(Mousewheel)}
                navigation={swiperModules.includes(Navigation)}
                modules={swiperModules}
                className="h-[650px] xl:h-[600px] w-full swiperTrial xl:w-[150px] lg:h-[500px]"
                breakpoints={{
                  950: {
                    slidesPerView: 3,
                  },
                }}
              >
                {productData.images?.map((prodImages) => (
                  <SwiperSlide key={prodImages.id} className="single-slide">
                    {productData.productSale !== 0 &&
                      productData.productSale !== null && (
                        <div className=" h-[50px]  hidden lg:flex justify-end absolute w-[100%] z-[1]">
                          <div className="flex justify-center items-center w-[120px] text-center">
                            <img
                              className=""
                              src={saleFlag}
                              alt="sale-tag"
                            ></img>
                            <p className="leading-[1] font-[100] font-[FahKwang] text-[12px]  uppercase absolute text-white ">
                              {productData.productSale}% off
                            </p>
                          </div>
                        </div>
                      )}

                    <div
                      className="h-[100%] lg:w-[100%] w-[180px]"
                      onClick={() => setImageChange(prodImages.ImageURL)}
                    >
                      <img
                        className="cursor-pointer slidersImage "
                        src={`http://localhost:8000/api/storage/${prodImages.ImageURL}`}
                        alt={`${prodImages.id}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {productData && (
                <div className="flex h-[650px] xl:h-[600px] w-[450px] xl:w-[400px] lg:hidden lg:w-[0] justify-end text-white relative">
                  {productData.productSale !== 0 &&
                    productData.productSale !== null && (
                      <div className="flex justify-center items-start absolute z-[1]">
                        <div className="flex justify-center items-center py-[20%] w-[100%] text-center">
                          <img
                            className="xl:w-[10vw] w-[8vw]"
                            src={saleFlag}
                            alt="sale-tag"
                          />
                          <p className="leading-[1] font-[100] font-[FahKwang] text-[0.8vw] xl:text-[1vw] uppercase absolute">
                            {productData.productSale}% OFF
                          </p>
                        </div>
                      </div>
                    )}

                  <div
                    className="w-[100%] h-[100%] relative overflow-hidden"
                    onMouseMove={(e) => handleMouseMove(e)}
                    onMouseLeave={() => resetZoom()}
                  >
                    <img
                      id="productImage"
                      className="w-[100%] h-[100%] object-cover transition-transform duration-500 ease-in-out cursor-zoom-in"
                      src={`http://localhost:8000/api/storage/${
                        imageUrl || productData.images[0]?.ImageURL
                      }`}
                      alt={`${productData.id}`}
                      style={{ transformOrigin: "center", objectFit: "cover" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="h-[100%] w-[400px] xl:w-[350px] lg:w-[75%] md:w-[80%] sm:w-[95%] flex justify-between flex-col">
              <div className=" flex flex-col h-[100%] gap-[5px]">
                <div className={`w-[100%] ${isArabic ? "  text-right" : ""}`}>
                  <h1
                    className={`leading-[1]   text-[20px] pb-[2%] sm:text-[19px] ${
                      isArabic
                        ? " flex flex-row-reverse items-center gap-[1%] text-[25px]"
                        : ""
                    }`}
                  >
                    {productData.productName}{" "}
                    <span className="text-[11px] text-[gray] px-[2%]">
                      {productData.productSKU}
                    </span>
                  </h1>

                  <p className=" text-[18px] leading-[1] w-[100%] sm:text-[19px]">
                    {productData.productTitle}
                  </p>
                  {productData.productSale !== 0 &&
                  productData.productSale !== null ? (
                    <div
                      className={`flex  gap-[3%] w-[100%]  my-[2%] ${
                        isArabic ? "justify-end" : "justify-start"
                      }`}
                    >
                      <p className=" text-[12px]  sm:text-[17px] font-[100] flex justify-start items-center  font-[FrutigerLTCom-Roman] line-through text-[#9f9f9f]">
                        {(productData.productPrice * currencyValue).toFixed(2)}{" "}
                        {currencyUsed}
                      </p>
                      {productData.productSale && (
                        <p className=" text-[18px] sm:text-[17px]  flex justify-center items-center font-[FrutigerLTCom-Roman]">
                          {(
                            (productData.productPrice -
                              productData.productPrice *
                                (productData.productSale / 100)) *
                            currencyValue
                          ).toFixed(2)}
                          {currencyUsed}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="py-[2%]  lg:py-[1%] text-[18px] sm:text-[17px]">
                      {(productData.productPrice * currencyValue).toFixed(2)}{" "}
                      {currencyUsed}
                    </p>
                  )}
                </div>

                <div className="">
                  <h2
                    className={`text-[12px] xl:text-[12px] text-[#1e335a] ${
                      isArabic ? " text-[18px] text-right w-[100%]" : ""
                    }`}
                  >
                    {t("singleProductPage.color")}
                  </h2>
                  <div
                    className={`flex items-center gap-[1%]  ${
                      isArabic ? "flex-row-reverse " : ""
                    }`}
                  >
                    <input type="radio" id="colorRadio" checked></input>
                    <label for="colorRadio">
                      {productData.productColor ?? "---"}
                    </label>
                  </div>
                </div>
                {loadingSizeType && (
                  <div className="bg-[#cfcfcf] h-[50px]"></div>
                )}

                {productData.productQuantity == null ? (
                  <div className="">
                    <h2
                      className={`text-[12px] xl:text-[12px] text-[#1e335a] ${
                        isArabic ? " text-[18px] text-right w-[100%]" : ""
                      }`}
                    >
                      {t("singleProductPage.size")}
                    </h2>
                    <div
                      className={`w-[100%] h-[auto] py-[1%] flex gap-[3%] flex-wrap ${
                        isArabic ? " flex-row-reverse" : ""
                      }`}
                    >
                      {productData.sizes?.map((prodSize) => (
                        <button
                          key={prodSize.id}
                          onClick={() => handleSizeClick(prodSize.id)}
                          className={`mt-[2%] border-[1px] flex text-[#7d7d7d] justify-center items-center border-[#2f4672] w-[40px] h-[40px] ${
                            selectedSize === prodSize.id
                              ? "text-[white] bg-[#ea9e7e]"
                              : "hover:text-white hover:bg-[#ea9e7e]"
                          }`}
                        >
                          <p className="text-[0.8vw] xl:text-[13px] w-[100%] h-[100%] flex justify-center items-center">
                            {prodSize.size}
                          </p>
                        </button>
                      ))}
                    </div>
                    {selectedQuantity !== null && (
                      <p
                        className={` text-[12px] text-[#ea9e7e] py-[0.5px] ${
                          isArabic ? "text-right" : ""
                        }`}
                      >
                        {t("singleProductPage.only")}{" "}
                        <span>{selectedQuantity}</span>{" "}
                        {t("singleProductPage.availableSize")}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-[20px]">
                    <h2
                      className={`text-[12px] py-[0.5%] xl:text-[12px] text-[#1e335a]  ${
                        isArabic ? " text-[18px] text-right w-[100%]" : ""
                      }`}
                    >
                      {t("singleProductPage.quantity")}
                    </h2>
                    <p
                      className={`border-[1px] py-[1%] border-[#1e335a] px-[2%] rounded-[5px] ${
                        isArabic ? "text-right" : ""
                      }`}
                    >
                      {" "}
                      {productData.sizes[0].quantity}{" "}
                    </p>
                  </div>
                )}

                {sizetoChoose && selectedSize === "" && (
                  <div className=" w-[100%] pt-[2%]  flex items-center justify-center">
                    <p className=" text-center text-[12px] w-[80%] text-[#ea9e7e]">
                      {t("singleProductPage.selectSize")}
                    </p>
                  </div>
                )}
                {isMaxQuantityReached && (
                  <div className=" w-[100%] pt-[2%] flex items-center justify-center">
                    <p className="text-center text-[12px] w-[80%] text-[#ea9e7e]">
                      {t("singleProductPage.maxQuantity")}
                    </p>
                  </div>
                )}

                <div className="md:mt-[2%] py-[2.5%] leading-[1.2] flex justify-center items-center flex-col">
                  {selectedSize === "" && quantityForAcc == null ? (
                    // Handle case when no size is selected and it's not a bag
                    <button
                      onClick={chooseSize}
                      className="w-[100%] py-[2.5%] bg-[#676f98] text-white text-[12px]"
                    >
                      {t("singleProductPage.cart")}
                    </button>
                  ) : (
                    // Handle case when size is selected or when it's a bag (handled by quantityForAcc !== null)
                    <button
                      onClick={handleStoreInLS}
                      disabled={isMaxQuantityReached || loadAddToCart} // Disable if max quantity is reached or loading
                      className={`w-[100%] py-[2.5%] text-white text-[12px] ${
                        isMaxQuantityReached || loadAddToCart // Adjust styles based on loading or max quantity reached
                          ? "bg-[#475164] cursor-not-allowed hover:bg-[#475164] text-[#c1c1c1] hover:text-[#c1c1c1]"
                          : "bg-[#676f98] hover:text-[#ea9e7e] hover:bg-[#2f4672]"
                      }`}
                    >
                      {loadAddToCart ? ( // Show loader if loading
                        <p className="text-[#ea9e7e]">Loading...</p>
                      ) : (
                        t("singleProductPage.cart") // Show cart text otherwise
                      )}
                    </button>
                  )}
                </div>
                {productData.importantNote == null ? (
                  <></>
                ) : (
                  <p className="text-[red] text-[10px]">
                    {productData.importantNote}
                  </p>
                )}

                {productData.productDescription == null ? (
                  <div className="flex flex-col items-start justify-evenly h-[55%]  mt-[5px] bg-[#e6e5e5]">
                    <div className="   px-[3%]  w-[100%] leading-[1.2] flex justify-center items-start flex-col">
                      <div className="border-b-[0.5px] md:py-[3%] border-white h-[100%] w-[100%] p-[3%] flex items-start flex-col justify-center">
                        <h2
                          className={`text-[12px] xl:text-[12px] text-[#1e335a] ${
                            isArabic ? " text-[18px] text-right w-[100%]" : ""
                          }`}
                        >
                          {t("singleProductPage.designer")}
                        </h2>
                        <p
                          className={`text-[12px] xl:text-[12px] text-[#7d7d7d] ${
                            isArabic ? " w-[100%] text-right " : ""
                          }`}
                        >
                          {productData.productDesign}
                        </p>
                      </div>
                    </div>

                    <div className="   px-[3%]  w-[100%]  leading-[1.2] flex justify-center items-start flex-col">
                      <div className="border-b-[0.5px] border-white md:py-[3%] h-[100%] w-[100%] p-[3%] flex items-start flex-col justify-center">
                        <h2
                          className={`text-[12px] xl:text-[12px] text-[#1e335a] ${
                            isArabic ? " text-[18px] text-right w-[100%]" : ""
                          }`}
                        >
                          {t("singleProductPage.country")}
                        </h2>
                        <p
                          className={`text-[12px] xl:text-[12px] text-[#7d7d7d] ${
                            isArabic ? " w-[100%] text-right " : ""
                          }`}
                        >
                          {productData.productCountry}
                        </p>
                      </div>
                    </div>

                    <div className="   px-[3%]  w-[100%]  leading-[1.2] flex justify-center items-start flex-col">
                      <div className="border-b-[0.5px] border-white md:py-[3%] h-[100%] w-[100%] p-[3%] flex items-start flex-col justify-center">
                        <h2
                          className={`text-[12px] xl:text-[12px] text-[#1e335a] ${
                            isArabic ? " text-[18px] text-right w-[100%]" : ""
                          }`}
                        >
                          {t("singleProductPage.fabric")}
                        </h2>
                        <p
                          className={`text-[12px] xl:text-[12px] text-[#7d7d7d] ${
                            isArabic ? " w-[100%] text-right" : ""
                          }`}
                        >
                          {productData.productFabric}
                        </p>
                      </div>
                    </div>

                    <div className="   px-[3%]  w-[100%]  leading-[1.2] flex justify-center items-start flex-col">
                      <div className="border-b-[0.5px] border-white md:py-[3%] h-[100%] w-[100%] p-[3%] flex items-start flex-col justify-center">
                        <h2
                          className={`text-[12px] xl:text-[12px] text-[#1e335a] ${
                            isArabic ? " text-[18px] text-right w-[100%]" : ""
                          }`}
                        >
                          {t("singleProductPage.washing")}
                        </h2>
                        <p
                          className={`text-[12px] xl:text-[12px] text-[#7d7d7d] ${
                            isArabic ? " w-[100%] text-right" : ""
                          }`}
                        >
                          {productData.productWashing}
                        </p>
                      </div>
                    </div>
                    <div className="   px-[3%]  w-[100%]  leading-[1.2] flex justify-center items-start flex-col">
                      <div className="border-b-[0.5px] border-white md:py-[3%] h-[100%] w-[100%] p-[3%] flex items-start flex-col justify-center">
                        <h2
                          className={`text-[12px] xl:text-[12px] text-[#1e335a] ${
                            isArabic ? " text-[18px] text-right w-[100%]" : ""
                          }`}
                        >
                          {t("singleProductPage.wearing")}
                        </h2>
                        <p
                          className={`text-[12px] xl:text-[12px] text-[#7d7d7d] ${
                            isArabic ? " w-[100%] text-right" : ""
                          }`}
                        >
                          {productData.productWearing}
                        </p>
                      </div>
                    </div>
                    <div className="   px-[3%]  w-[100%]  leading-[1.2] flex justify-center items-start flex-col">
                      <div className="border-b-[0.5px] border-white md:py-[3%] h-[100%] w-[100%] p-[3%] flex items-start flex-col justify-center">
                        <p
                          className={`text-[12px] xl:text-[12px] xl:w-[100%]   text-[#7d7d7d] ${
                            isArabic ? " w-[100%] text-right" : "w-[200px]"
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: t("singleProductPage.sizeChart"),
                          }}
                        />
                      </div>
                    </div>
                    <div className=" h-[15%]  px-[3%]  w-[100%]  leading-[1.2] flex justify-center items-center flex-col">
                      <div className=" h-[100%] w-[100%]  p-[3%] md:py-[3%] flex items-start flex-col justify-center">
                        <p
                          className={`text-[12px] xl:text-[12px] xl:w-[100%]   text-[#7d7d7d] ${
                            isArabic ? " w-[100%] text-right" : "w-[290px]"
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: t("singleProductPage.shipping"),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {isArabic ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productData.productDescription_ar,
                        }}
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productData.productDescription,
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProduct;
