import React, { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import parrotCart from "../../images/Home/parrot.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import { useTranslation } from "react-i18next";
import { BsCart3 } from "react-icons/bs";

function CartComponent() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState([]);
  const [cartLength, setCartLength] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [subtotalAfterDiscount, setSubtotalAfterDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("109");
  const [prodWeight, setProdWeight] = useState([]);
  const [countryPrice, setCountryPrice] = useState(4);
  const [soldOut, setSoldOut] = useState(false);
  const cartItems = localStorage.getItem("cartLength");
  const [currencyValue, setCurrencyValue] = useState(1);
  const currencyUsed = localStorage.getItem("currencyUsed");
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [checkoutLoader, setCheckoutLoader] = useState(false);
  const [loadCountry, setLoadCountry] = useState(false);
  const selectedLang = localStorage.getItem("lang");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const cartRefNumber = localStorage.getItem("cartNumber");

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
      setLang(selectedLang);
    }
  }, [i18n]);

  const isArabic = lang === "ar";

  useEffect(() => {
    const currencyUsed = localStorage.getItem("currencyUsed");
    if (currencyUsed) {
      axios
        .post("http://127.0.0.1:8000/api/currency-name", {
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
      "ABC3253526790DEFGHIJ@$%&8345789NOPQRSTXYZabcdijklmnopqrstuvwxyz0123456789 ";
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
  const cartId = carthidden;
  const getProductsInCart = async () => {
    setLoadingItems(true);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      const sizeIds = cart.map((item) => item.selectedSize);
      const res = await axios.get(
        "http://127.0.0.1:8000/api/product-size-cart",
        {
          params: {
            sizeIds: sizeIds,
            locale: selectedLang,
          },
        }
      );
      const getQuantityMax = res.data;
     
      const maxQuan = getQuantityMax.map((item) => item.size);
      const soldout = getQuantityMax.map((item) => item.size.quantity);
      const isDeletedCase = getQuantityMax.map(
        (item) => item.product.isDeleted
      );
      const deletedCase = isDeletedCase.includes(1);
      const isHiddenCase = getQuantityMax.map(
        (item) => item.product.productVisible
      );
      const hiddenCase = isHiddenCase.includes(0);
      setIsDeleted(deletedCase);
      setIsHidden(hiddenCase);
      setProducts(getQuantityMax);
      setCart(cart);
      setMaxQuantity(maxQuan);
      const hasSoldOutItem = soldout.includes("0");
      setSoldOut(hasSoldOutItem);

      const totalWeight = cart.reduce((total, item) => {
        const product = getQuantityMax.find(
          (p) => String(p.size.id) === String(item.selectedSize)
        );
        return total + (product ? product.productWeight * item.quantity : 0);
      }, 0);
      setProdWeight(totalWeight);
    } else {
      setProducts([]);
      setCart([]);
    }
    setLoadingItems(false);
  };

  useEffect(() => {
    getProductsInCart();
  }, []);

  const findQuantity = (productId, selectedSize) => {
    const item = cart.find(
      (item) =>
        String(item.productId) === String(productId) &&
        String(item.selectedSize) === String(selectedSize)
    );
    return item ? item.quantity : 0;
  };

  const updateProdWeight = async (updatedCart) => {
    setLoadCountry(true);
    if (updatedCart.length > 0 && selectedCountry !== 109) {
      const totalWeight = updatedCart.reduce((total, item) => {
        const product = products.find(
          (p) => String(p.size.id) === String(item.selectedSize)
        );
        return total + (product ? product.productWeight * item.quantity : 0);
      }, 0);
      setProdWeight(totalWeight);

      const selectedCountryObj = countries.find(
        (country) => String(country.id) === String(selectedCountry)
      );
      if (selectedCountryObj) {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/shipping-details/${selectedCountryObj.id}?totalWeight=${totalWeight}`
        );
        const price = response.data.shippingFee;
        setCountryPrice(price);
      }
    }
    setLoadCountry(false);
  };

  useEffect(() => {
    updateProdWeight(cart, products);
  }, [cart, products, selectedCountry, countries]);

  const handleIncrease = async (productId, selectedSize) => {
    const updatedCart = cart.map((item) => {
      if (
        String(item.productId) === String(productId) &&
        String(item.selectedSize) === String(selectedSize)
      ) {
        const maxQuantityForSize = maxQuantity.find(
          (q) => q.id === selectedSize
        );

        if (maxQuantityForSize) {
          const newQuantity = Math.min(
            maxQuantityForSize.quantity,
            item.quantity + 1
          );
          return {
            ...item,
            quantity: newQuantity,
          };
        }
      }
      return item;
    });
    updateCartState(updatedCart);
    updateProdWeight(updatedCart);
    await updateCartInDatabase(updatedCart);
  };

  const handleDecrease = async (productId, selectedSize) => {
    const updatedCart = cart?.map((item) => {
      if (
        String(item.productId) === String(productId) &&
        String(item.selectedSize) === String(selectedSize)
      ) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    updateCartState(updatedCart);
    updateProdWeight(updatedCart);
    await updateCartInDatabase(updatedCart);
  };

  const updateItemStatus = async (products) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/update-item-status/${cartRefNumber}`,
        {
          products: products, // Send the products array
        }
      );
    } catch (error) {
      console.error("Error updating item status:", error);
      // Optionally, handle errors or show a notification to the user
    }
  };
  const handleRemove = async (productId, selectedSize) => {
    const updatedCart = cart.filter((item) => {
      return !(
        String(item.productId) === String(productId) &&
        String(item.selectedSize) === String(selectedSize)
      );
    });

    updateCartState(updatedCart);
    updateProdWeight(updatedCart);

    // Prepare the product to remove
    const productsToRemove = [
      {
        size_id: selectedSize,
      },
    ];

    await updateItemStatus(productsToRemove); // Call the new function
    await getProductsInCart();
  };

  const handleClearCart = async () => {
    const updatedCart = []; // Clear the cart
    updateCartState(updatedCart); // Update the state with the empty cart
    updateProdWeight(updatedCart); // Update the product weight accordingly

    // Prepare the productsToRemove array to send
    const productsToRemove = cart.map((item) => ({
      size_id: item.selectedSize, // Assuming you want to remove all sizes in the cart
    }));

    await updateItemStatus(productsToRemove); // Call the new function
    await getProductsInCart();
  };

  useEffect(() => {
    let total = 0;
    products.forEach((prod) => {
      const item = cart.find(
        (item) =>
          String(item.productId) === String(prod.product.id) &&
          String(item.selectedSize) === String(prod.size.id)
      );
      if (item) {
        if (
          prod.product.productSale !== 0 &&
          prod.product.productSale !== null
        ) {
          total +=
            prod.product.productPrice *
            (1 - prod.product.productSale / 100) *
            item.quantity;
        } else {
          total += prod.product.productPrice * item.quantity;
        }
      }
    });
    setSubtotal(total);
    setSubtotalAfterDiscount(total);
  }, [cart, products]);

  useEffect(() => {
    setTotal(subtotalAfterDiscount + parseFloat(countryPrice));
  }, [subtotalAfterDiscount, countryPrice]);

  const updateCartInDatabase = async (updatedCart) => {
    if (cartRefNumber) {
      const cartInfo = {
        subtotal: subtotal,
        subtotalAfterDiscount: subtotalAfterDiscount,
        shippingFee: countryPrice,
        tax: 0,
        total: total,
        status: "Added To Cart",
        shipping_country_id: selectedCountry,
        products: updatedCart?.map((item) => {
          const product = products.find(
            (p) => String(p.size.id) === String(item.selectedSize)
          );
          return {
            product_id: item.productId,
            quantity: item.quantity,
            size_id: item.selectedSize,
            productPrice: product
              ? product.product.productSale && product.product.productSale !== 0
                ? (
                    product.product.productPrice *
                    (1 - product.product.productSale / 100)
                  ).toFixed(2)
                : product.product.productPrice
              : 0,
            totalWeight: product ? product.productWeight * item.quantity : 0,
          };
        }),
      };
      const res = await axios.post(
        `http://127.0.0.1:8000/api/edit-cart/${cartRefNumber}`,
        { ...cartInfo, _method: "PATCH" }
      );
      return res.data;
    }
  };

  const updateCartState = (updatedCart) => {
    const newCartLength = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartLength(newCartLength);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartLength", JSON.stringify(newCartLength));
    window.dispatchEvent(new Event("storage"));
  };

  const getCountries = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/shipping-countries",
      { params: { locale: selectedLang } }
    );
    setCountries(res.data.message);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const getUpdatedShippingPrice = async () => {
    const selectedCountryObj = countries.find(
      (country) => String(country.id) === String(selectedCountry)
    );
    if (selectedCountryObj && cart.length > 0) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/shipping-details/${selectedCountryObj.id}?totalWeight=${prodWeight}`
      );
      const price = response.data.shippingFee;
      setCountryPrice(price);
    }
  };

  useEffect(() => {
    const storedCountry = JSON.parse(localStorage.getItem("country"));
    if (storedCountry) {
      setSelectedCountry(storedCountry.id);
    } else {
      const defaultCountry = {
        id: "109",
        name: "Lebanon",
      };
      localStorage.setItem("country", JSON.stringify(defaultCountry));
      setSelectedCountry(defaultCountry.id);
    }
  }, []);

  const handleCountryChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedCountry(selectedValue);
    const selectedCountryObj = countries.find(
      (country) => String(country.id) === String(selectedValue)
    );
    await getUpdatedShippingPrice();
    if (selectedCountryObj) {
      const countryData = {
        id: selectedCountryObj.id,
        name: selectedCountryObj.country_name,
      };
      localStorage.setItem("country", JSON.stringify(countryData));
    }
  };

  const addCartToDbForGuest = async () => {
    const cartId = carthidden;
    const cartRefNumber = localStorage.getItem("cartNumber");
    const cartInfo = {
      subtotal: subtotal,
      subtotalAfterDiscount: subtotalAfterDiscount,
      shippingFee: countryPrice,
      tax: 0,
      total: total,
      status: "Reached Checkout",
      shipping_country_id: selectedCountry,
      products: cart.map((item) => {
        const product = products.find(
          (p) => String(p.size.id) === String(item.selectedSize)
        );
        return {
          product_id: item.productId,
          quantity: item.quantity,
          size_id: item.selectedSize,
          productPrice: product
            ? product.product.productSale && product.product.productSale !== 0
              ? (
                  product.product.productPrice *
                  (1 - product.product.productSale / 100)
                ).toFixed(2)
              : product.product.productPrice
            : 0,

          totalWeight: product ? product.productWeight * item.quantity : 0,
        };
      }),
    };
    if (cartRefNumber) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/single-cart/${cartRefNumber}`
      );
      const cartReferenceNumber = response.data.message.uniqueCartId;

      if (cartRefNumber === cartReferenceNumber) {
        try {
          setLoading(true);

          const res = await axios.post(
            `http://127.0.0.1:8000/api/edit-cart/${cartRefNumber}`,
            { ...cartInfo, _method: "PATCH" }
          );

          navigate("/checkout");
          return res.data;
        } catch (error) {
          console.error("Error adding cart to database:", error);
        } finally {
          setLoading(false);
        }
      } else {
        createCartForAll(cartInfo);
      }
    } else {
      createCartForAll(cartInfo);
    }
  };

  const createCartForAll = async (cartInfo) => {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/add-cart-for-all",
      cartInfo
    );

    const obfuscatedCartId = obfuscateCartId(res.data.cart.id);
    localStorage.setItem("cartInfo", obfuscatedCartId);

    localStorage.setItem("cartNumber", res.data.cart.uniqueCartId);

    navigate("/checkout");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      {loading ? (
        <div className="text-[18px] xl:text-[15px] gap-[5%] h-[100vh] w-[100%] flex  flex-col justify-center items-center">
          <img
            className="w-[50px] h-[110px]"
            src={Loader}
            alt="parrot-loader"
          ></img>
        </div>
      ) : (
        <div
          className={`   h-[auto] text-[#1e335a] py-[2%] w-[100%] lg:items-center flex justify-center lg:justify-start gap-[2%] lg:flex-col font-[FrutigerLTCom-Roman] ${
            isArabic ? "flex-row-reverse text-right" : ""
          }`}
        >
          <div className="w-[50%] xl:w-[60%] lg:w-[90%]  h-[700px] 2xl:h-[600px] lg:h-[auto] border-[1px] md:pb-[5%] lg:my-[2%]  border-[#2f4672] overflow-auto scrollbar-hidden">
            <div className="w-[100%] flex items-center justify-center bg-[#082252] h-[50px]">
              <p className="text-[20px] text-white font-[FahKwang] ">
                {t("cart.cartTitle")}
              </p>
            </div>
            {loadingItems ? (
              <div className="h-[80%] flex justify-center items-center">
                <svg className="circular-loader" viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              </div>
            ) : (
              <>
                {cartItems == 0 || !cartItems ? (
                  <div className="gap-[5%] flex flex-col items-center p-[10%] h-[100%]">
                    <div className="h-[100px] w-[100px] sm:w-[70px] sm:h-[70px]">
                      <img
                        className="h-[100%] w-[100%] "
                        src={parrotCart}
                        alt="parrotCart"
                      ></img>
                    </div>
                    <p className="text-[20px] font-[FrutigerLTCom-Roman] w-[300px] md:text-[16px] xl:text-[12px] md:w-[250px] text-center">
                      {t("cart.empty")}
                    </p>
                    <Link
                      to="/"
                      className="bg-[#676f98] font-[FahKwang] flex items-center justify-center hover:text-[#E79E7F] hover:bg-[#2f4672] h-[50px] text-white w-[120px]"
                    >
                      {t("cart.shopNow")}
                    </Link>
                  </div>
                ) : (
                  <>
                    <div
                      className={`flex  items-center px-[9%] py-[1%] border-b-[1px] border-[#082252] md:py-[3%] ${
                        isArabic ? "justify-start px-[5%]" : "justify-end "
                      }`}
                    >
                      <button
                        onClick={handleClearCart}
                        className={`hover:text-[#E79E7F] text-[#082252] gap-[5px] flex ${
                          isArabic ? "flex-row-reverse" : ""
                        }`}
                      >
                        {" "}
                        {t("cart.emptyCart")}{" "}
                        <BsTrash3Fill className="w-[20px] h-[20px] md:w-[15px]" />{" "}
                      </button>
                    </div>
                    <div className="flex justify-center items-center flex-col w-[100%]">
                      {products &&
                        products.map((prod) => (
                          <div
                            className="border-b-[1px] w-[90%] lg:w-[100%] border-[#2f4672] py-[2%] flex justify-evenly items-center"
                            key={prod.size.id}
                          >
                            <div
                              className={`flex sm: justify-evenly items-center w-[100%] ${
                                isArabic ? "flex-row-reverse" : ""
                              }`}
                            >
                              <div className="h-[150px] flex justify-center items-center sm:w-[60px] sm:h-[60px] relative  w-[130px] xl:w-[120px]">
                                {(prod.size.quantity == 0 ||
                                  prod.product.isDeleted == 1 ||
                                  prod.product.productVisible == 0) && (
                                  <div className=" w-[100%] h-[100%] flex justify-center items-center text-white absolute">
                                    <p className="w-[100%] sm:text-[1.5vw] text-center h-[100%] overlay bg-opacity-50 bg-[#431314b8] flex justify-center items-center font-[FahKwang] text-[18px] uppercase">
                                      {t("soldOut")}
                                    </p>
                                  </div>
                                )}
                                <img
                                  src={`http://127.0.0.1:8000/api/storage/${prod.product.media1}`}
                                  className="object-contain w-[100%] h-[100%] "
                                  alt={prod.product.productName}
                                />
                              </div>

                              <div
                                className={`flex flex-col  leading-[1] w-[20%] ${
                                  isArabic
                                    ? "text-right"
                                    : "justify-start items-start"
                                }`}
                              >
                                <p className="text-[18px] xl:text-[15px] sm:text-[10px]">
                                  {prod.product.productName}
                                </p>
                                <p className="text-[15px] xl:text-[12px] sm:text-[8px]">
                                  {prod.product.productColor}, {prod.size.size}
                                </p>
                                {prod.product.productSale && (
                                  <p className="text-[15px] xl:text-[12px] sm:text-[8px] text-[#E79E7F] pt-[2%]">
                                    {prod.product.productSale}% OFF
                                  </p>
                                )}
                              </div>

                              {prod.size.quantity == 0 ||
                              prod.product.isDeleted == 1 ||
                              prod.product.productVisible == 0 ? (
                                <div className="w-[39%] sm:w-[50%]"></div>
                              ) : (
                                <>
                                  {prod.product.productSale ? (
                                    <p className="text-[15px] xl:text-[12px] sm:text-[8px]">
                                      {(
                                        (prod.product.productPrice -
                                          prod.product.productPrice *
                                            (prod.product.productSale / 100)) *
                                        currencyValue
                                      ).toFixed(2)}
                                      {currencyUsed}
                                    </p>
                                  ) : (
                                    <div className="">
                                      <p className="text-[15px] xl:text-[12px] sm:text-[8px]">
                                        {(
                                          prod.product.productPrice *
                                          currencyValue
                                        ).toFixed(2)}{" "}
                                        {currencyUsed}
                                      </p>
                                    </div>
                                  )}

                                  <div className="h-[25px] border-[1px] border-[#2f4672] rounded-full flex items-center sm:w-[20%] sm:h-[20px] w-[8%] md:w-[15%] justify-evenly">
                                    <button
                                      onClick={() =>
                                        handleDecrease(
                                          prod.product.id,
                                          prod.size.id
                                        )
                                      }
                                      className="w-[35%] hover:border-l-[1px] hover:bg-[#E79E7F] hover:border-[#E79E7F] hover:text-white hover:rounded-l-full border-r-[1px] h-[100%] text-[#E79E7F] border-[#2f4672] flex items-center justify-center"
                                    >
                                      -
                                    </button>
                                    <p className="w-[30%] flex items-center justify-center h-[100%] xl:text-[12px]">
                                      {findQuantity(
                                        prod.product.id,
                                        prod.size.id
                                      )}
                                    </p>
                                    <button
                                      onClick={() =>
                                        handleIncrease(
                                          prod.product.id,
                                          prod.size.id
                                        )
                                      }
                                      className="w-[35%] hover:border-r-[1px] hover:bg-[#E79E7F] hover:border-[#E79E7F] hover:text-white hover:rounded-r-full border-l-[1px] h-[100%] text-[#E79E7F] border-[#2f4672] flex items-center justify-center"
                                    >
                                      +
                                    </button>
                                  </div>

                                  {prod.product.productSale ? (
                                    <div className="w-[15%] flex items-center justify-center">
                                      <p className="text-[15px] text-center w-[100%] xl:text-[12px] sm:text-[8px]">
                                        {" "}
                                        {(
                                          prod.product.productPrice *
                                          currencyValue *
                                          (1 - prod.product.productSale / 100) *
                                          findQuantity(
                                            prod.product.id,
                                            prod.size.id
                                          )
                                        ).toFixed(2)}
                                        {currencyUsed}
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="w-[15%] flex items-center justify-center">
                                      <p className="text-[15px] text-center w-[100%] xl:text-[12px] sm:text-[8px]">
                                        {(
                                          prod.product.productPrice *
                                          currencyValue *
                                          findQuantity(
                                            prod.product.id,
                                            prod.size.id
                                          )
                                        ).toFixed(2)}{" "}
                                        {currencyUsed}
                                      </p>
                                    </div>
                                  )}
                                </>
                              )}

                              <div className="w-[20px] sm:w-[15px] h-[20px]">
                                <BsTrash3Fill
                                  onClick={() =>
                                    handleRemove(prod.product.id, prod.size.id)
                                  }
                                  className="text-[#E79E7F] cursor-pointer w-[100%] h-[100%] hover:text-[#f5baa1]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className=" w-[30%] xl:w-[35%] h-[fit-content] lg:h-[auto] relative lg:w-[90%] border-[1px] border-[#2f4672] flex flex-col ">
            <div className="w-[100%] flex items-center justify-center bg-[#082252] h-[50px]">
              <p className="text-[20px] text-white font-[FahKwang]">
                {t("cart.orderSummary")}
              </p>
            </div>
            <div className="p-[2%]">
              <div className=" h-[100%] flex flex-col items-center gap-[10%] xl:gap-[5%]">
                <div className="px-[2%]  pt-[5%] flex items-center flex-col w-[100%] ">
                  <div
                    className={`w-[100%] px-[1%] flex justify-between  h-[50px] flex-row items-center ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <p className="text-[18px] xl:text-[15px]">
                      {t("cart.subtotal")}
                    </p>
                    <p className="text-[15px]">
                      {(subtotal * currencyValue).toFixed(2)} {currencyUsed}
                    </p>
                  </div>
                  <div
                    className={`w-[100%] px-[1%] flex justify-between  h-[50px]flex-row items-center  ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <p className="text-[18px] xl:text-[15px]">
                      {t("cart.shippingTo")}
                    </p>
                    <div
                      className={` w-[40%] 2xl:w-[60%] ${
                        isArabic ? "" : "dropdown-container"
                      }`}
                    >
                      <select
                        className={`custom-select cursor-pointer w-[100%] text-[0.8vw] xl:text-[15px] h-[50px] bg-[#EEEEEE] border-[0.5px] px-[5%] border-black ${
                          isArabic ? "text-right" : ""
                        }`}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                      >
                        {countries.map((count) => (
                          <option key={count.id} value={count.id}>
                            {count.country_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {loadCountry && (
                    <div className="w-[100%] px-[1%] flex justify-center items-center h-[90%] lg:h-[90%] lg:top-[10%] bg-[#a5a5a554] top-[10%] absolute">
                      <svg className="circular-loader" viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                      </svg>
                    </div>
                  )}
                  <div
                    className={`w-[100%] px-[1%]  h-[50px] flex justify-between flex-row items-center  ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <p className="text-[18px] xl:text-[15px]">
                      {t("cart.shippingFee")}
                    </p>
                    <p className="text-[15px]">
                      {(countryPrice * currencyValue).toFixed(2)} {currencyUsed}
                    </p>
                  </div>

                  <div
                    className={`w-[100%] px-[1%] flex justify-between flex-row items-center  h-[50px] ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <p className="text-[18px] xl:text-[15px]">
                      {t("cart.tax")}
                    </p>
                    <p className="text-[15px]">0 {currencyUsed}</p>
                  </div>
                  <div
                    className={`w-[100%] px-[1%] flex justify-between flex-row items-center  h-[50px] ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <p className="text-[18px] xl:text-[15px]">
                      {t("cart.total")}
                    </p>
                    <p className="text-[15px]">
                      {(total * currencyValue).toFixed(2)} {currencyUsed}
                    </p>
                  </div>
                </div>

                <div className="flex py-[2%]  items-center justify-center w-[100%] ">
                  <p className="text-center text-[16px] xl:text-[12px] ">
                    {t("cart.desc")}
                    <a
                      href="/exchange-policy"
                      className="text-[#E79E7F] cursor-pointer"
                    >
                      {t("cart.anchor")}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {cart.length > 0 ? (
              <div className="flex justify-center items-center h-[auto]">
                {soldOut || isDeleted || isHidden ? (
                  <div className="flex justify-between flex-col w-[100%] items-center">
                    <p className="text-center text-[12px] w-[80%] text-[#ea9e7e]">
                      {t("cart.remove")}
                    </p>

                    <button className="text-white w-[100%] h-[70px] bg-[#676f98] font-[FahKwang] cursor-not-allowed text-center text-[20px]">
                      {t("cart.checkout")}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={addCartToDbForGuest}
                    className="text-white h-[70px] w-[100%] hover:bg-[#2f4672] bg-[#676f98] font-[FahKwang] hover:text-[#E79E7F] text-center text-[20px]"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : t("cart.checkout")}
                  </button>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[70px]">
                <button className="text-white w-[100%] h-[100%] bg-[#676f98] font-[FahKwang] cursor-not-allowed text-center text-[20px]">
                  {t("cart.checkout")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartComponent;
