import React, { useEffect, useState } from "react";
import DashboardMenu from "./DashboardMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
// import Loader from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import { useTranslation } from "react-i18next";
function OrdersHistory() {
  // const [activeTab, setActiveTab] = useState(() => {
  //   return localStorage.getItem("activeTab") || "ongoing";
  // });

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
  const userId = obfuscatedUser ? extractUserId(obfuscatedUser) : null;

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery("orders", async () => {
    const res = await axios.get(
      `https://www.cosmo.global/laravel/api/user-orders/${userId}`,
      {
        params: { locale: selectedLang },
      }
    );
    if (res.data.orders.oldOrder === 1) {
    }
    return res.data.orders;
  });

  // useEffect(() => {
  //   localStorage.setItem("activeTab", activeTab);
  // }, [activeTab]);

  // const filteredOrders =
  //   orders?.filter((order) =>
  //     activeTab === "ongoing"
  //       ? order.status === "Open order"
  //       : order.status === "Delivered"
  //   ) || [];

  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="p-[2%] h-[auto] font-[FrutigerLTCom-Roman]">
      <h1
        className={`text-[40px] font-[FahKwang] md:text-[25px] md:py-[5%] pb-[2%]  ${
          isArabic ? " text-right text-[15px]" : "md:text-[12px]"
        }`}
      >
        {t("dashboard.personalInfo.title")}
      </h1>
      <div
        className={`flex lg:flex-col gap-[2%] items-start ${
          isArabic ? "flex-row-reverse" : ""
        } `}
      >
        <DashboardMenu />
        <div className="bg-white px-[2%] w-[70%] pb-[2%] lg:w-[100%]">
          <div className="flex gap-[1%] flex-col">
            <p
              className={`h-[40px] flex items-end  ${
                isArabic
                  ? " text-right justify-end text-[15px]"
                  : "md:text-[12px]"
              }`}
            >
              <strong>{t("dashboard.personalInfo.orders")}</strong>
            </p>
            <div
              className={`border-b-[1px] h-[50px] flex items-center ${
                isArabic
                  ? " flex-row-reverse text-[15px]  sm:text-[10px]"
                  : "md:text-[12px]"
              }`}
            >
              {/* <Link
                to="#"
                className={`w-[150px] text-center h-[100%] hover:text-[#0d0d61] flex justify-center items-center ${
                  activeTab === "ongoing"
                    ? "text-[#0d0d61] border-b-[2px] border-[#0d0d61]"
                    : "border-b-[1px] "
                }`}
                onClick={() => setActiveTab("ongoing")}
              >
                {t("dashboard.orders.ongoing")}
              </Link>
              <Link
                to="#"
                className={`w-[150px] text-center h-[100%] hover:text-[#0d0d61] flex justify-center items-center ${
                  activeTab === "delivered"
                    ? "text-[#0d0d61] border-b-[2px] border-[#0d0d61]"
                    : "border-b-[1px] "
                }`}
                onClick={() => setActiveTab("delivered")}
              >
                {t("dashboard.orders.delivered")}
              </Link> */}
            </div>
            {isLoading && (
              <div className="h-[400px] flex justify-center items-center">
                <svg className="circular-loader" viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              </div>
            )}
            {!isLoading && orders.length === 0 && (
              <div className="h-[400px] flex justify-center items-center">
                <p> {t("dashboard.orders.noOrders")}</p>
              </div>
            )}

            {!isLoading &&
              orders.length > 0 &&
              orders.map((order) => (
                <div
                  key={order.id}
                  className="border-b-[0.1px] border-[#060076]  py-[2%] px-[5%] md:px-[1%]"
                >
                  <div
                    className={`flex justify-between  ${
                      isArabic
                        ? " flex-row-reverse text-[15px]  sm:text-[10px]"
                        : "md:text-[12px]"
                    }`}
                  >
                    <div className={`${isArabic ? "text-right" : ""}`}>
                      {order.oldOrder === 0 ? (
                        <>
                          <div
                            className={`text-[12px] gap-[3px] flex ${
                              isArabic ? "flex-row-reverse" : ""
                            }`}
                          >
                            <p>
                              <strong>{t("dashboard.orders.orderId")}</strong>
                            </p>
                            <p>
                              OR{order.cart.id}-{order.id}
                            </p>
                          </div>
                          <div
                            className={`text-[12px] gap-[3px] flex w-[fit-content] ${
                              isArabic ? "flex-row-reverse" : ""
                            }`}
                          >
                            <p className="pb-[1%]">
                              {t("dashboard.orders.orderDate")}
                            </p>
                            <p>
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div
                          className={`text-[12px] gap-[3px] flex ${
                            isArabic ? "flex-row-reverse" : ""
                          }`}
                        >
                          <p>
                            <strong>{t("dashboard.orders.orderId")}</strong>
                          </p>
                          <p>{order.oldOrderId}</p>
                        </div>
                      )}
                    </div>

                    {/* <div>
                      {order.status === "Delivered" ? (
                        <p className="h-[30px] w-[100px] flex justify-center items-center bg-[#95c09592] text-[#49b349]">
                          {t("dashboard.orders.delivered")}
                        </p>
                      ) : (
                        <p className="text-[#f16d6d] h-[30px] w-[100px] flex justify-center items-center bg-[#f35e5e77]">
                          {t("dashboard.orders.ongoing")}
                        </p>
                      )}
                    </div> */}
                  </div>
                
                  {order.cart.product.map((product) => (
                    <div
                      key={product.sizeDetails.id}
                      className={` border-b-[1px] py-[1%] w-[100%] flex justify-between items-center mt-[1%] ${
                        isArabic
                          ? " flex-row-reverse text-[15px]  sm:text-[10px]"
                          : "md:text-[12px]"
                      }`}
                    >
                      <div
                        className={`lg:w-[auto] flex justify-start gap-[2%] items-center w-[30%] ${
                          isArabic
                            ? "flex-row-reverse text-[15px]  sm:text-[10px]"
                            : "md:text-[12px]"
                        }`}
                      >
                        <img
                          src={`https://www.cosmo.global/laravel/api/storage/${product.media1}`}
                          alt={product.productName}
                          className="h-[100px] w-[70px] object-contain "
                        />
                        {!product.pivot.productName ? (
                          <div
                            className={`w-[fit-content]  ${
                              isArabic ? "text-right" : ""
                            }`}
                          >
                            <p className=" w-[fit-content]">
                              {product.productName}
                            </p>
                            <p>{product.sizeDetails.size}</p>
                          </div>
                        ) : (
                          <div
                            className={`w-[fit-content]  ${
                              isArabic ? "text-right" : ""
                            }`}
                          >
                            <p className=" w-[fit-content]">
                              {product.pivot.productName},{" "}
                              {product.pivot.ProductSKU}
                            </p>
                            <p>{product.pivot.productSize}</p>
                          </div>
                        )}
                      </div>
                      <>
                        {order.oldOrder === 0 ? (
                          <>
                            {" "}
                            <p>
                              {(
                                product.pivot.productPrice * order.currencyRate
                              ).toFixed(2)}{" "}
                              {order.currency}
                            </p>
                            <p>x {product.pivot.quantity}</p>
                            <p>
                              {(
                                product.pivot.productPrice *
                                order.currencyRate *
                                product.pivot.quantity
                              ).toFixed(2)}{" "}
                              {order.currency}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              {product.pivot.productPrice}
                              {order.currency}
                            </p>
                            <p>x {product.pivot.quantity}</p>
                            <p>
                              {product.pivot.productPrice *
                                product.pivot.quantity}
                              {order.currency}
                            </p>
                          </>
                        )}
                      </>
                    </div>
                  ))}
                  {order.oldOrder === 0 ? (
                    <div
                      className={`gap-[5px] flex flex-col py-[2%] ${
                        isArabic ? "" : "items-end"
                      }`}
                    >
                      <div
                        className={`text-[12px] md:text-[10px] gap-[3px] flex w-[fit-content] ${
                          isArabic ? " flex-row-reverse" : ""
                        }`}
                      >
                        <p>{t("cart.subtotal")} </p>
                        <p>
                          {(order.cart.subtotal * order.currencyRate).toFixed(
                            2
                          )}{" "}
                          {order.currency}
                        </p>
                      </div>
                      <div
                        className={`text-[12px] md:text-[10px] gap-[3px] flex w-[fit-content] ${
                          isArabic ? " flex-row-reverse" : ""
                        }`}
                      >
                        <p>{t("cart.shippingFee")} </p>
                        <p>
                          {(order.shippingFee * order.currencyRate).toFixed(2)}{" "}
                          {order.currency}
                        </p>
                      </div>
                      <div
                        className={`text-[12px] md:text-[10px] gap-[3px] flex w-[fit-content] ${
                          isArabic ? " flex-row-reverse" : ""
                        }`}
                      >
                        <p>{t("cart.total")} </p>
                        <p>
                          {(order.totalAmount * order.currencyRate).toFixed(2)}{" "}
                          {order.currency}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`gap-[5px] flex flex-col py-[2%] ${
                        isArabic ? "" : "items-end"
                      }`}
                    >
                      <div
                        className={`text-[12px] md:text-[10px] gap-[3px] flex w-[fit-content] ${
                          isArabic ? " flex-row-reverse" : ""
                        }`}
                      >
                        <p>{t("cart.subtotal")} </p>
                        <p>
                          {order.cart.subtotal}
                          {order.currency}
                        </p>
                      </div>
                      <div
                        className={`text-[12px] md:text-[10px] gap-[3px] flex w-[fit-content] ${
                          isArabic ? " flex-row-reverse" : ""
                        }`}
                      >
                        <p>{t("cart.shippingFee")} </p>
                        <p>
                          {order.shippingFee}
                          {order.currency}
                        </p>
                      </div>
                      <div
                        className={`text-[12px] md:text-[10px] gap-[3px] flex w-[fit-content] ${
                          isArabic ? " flex-row-reverse" : ""
                        }`}
                      >
                        <p>{t("cart.total")} </p>
                        <p>
                          {order.totalAmount}
                          {order.currency}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersHistory;
