import React, { useEffect } from "react";

import Loader from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function OnlinePaymentRedirect() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  useEffect(() => {
    checkOnlinePaymentStatus();
    // updateOrderStatus();
  }, [orderId]);

  const checkOnlinePaymentStatus = async () => {
    await axios.post(`http://127.0.0.1:8000/api/decreaseProduct/${orderId}`);

    await sendConfirmationEmail(orderId);
  };

  const sendConfirmationEmail = async (orderId) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/order/${orderId}`);
      const orderInfo = res.data.message;
      const cartRefNumber = res.data.message.cart.uniqueCartId;
      if (!orderInfo) {
        throw new Error("Order information is not available.");
      }

      await axios.post("http://127.0.0.1:8000/api/payment", {
        paymentMethod: "NetCommerce",
        status: "Paid",
        total: orderInfo.totalAmount,
        order_id: orderId,
      });

      const cart = await axios.get(
        `http://127.0.0.1:8000/api/cartItems-checkout/${orderInfo.cart_id}`
      );
      const cartItems = cart.data;

      if (!cartItems) {
        throw new Error("Cart items information is not available.");
      }
      const emailInfo = {
        orderId,
        cartId: orderInfo.cart.id,
        email: orderInfo.email,
        subtotal: orderInfo.totalAmount - orderInfo.shippingFee,
        shippingFee: orderInfo.shippingFee,
        total: orderInfo.totalAmount,
        note: orderInfo.note,
        billing_firstName: orderInfo.billing_firstName,
        billing_country: orderInfo.billing_country,
        billing_lastName: orderInfo.billing_lastName,
        billing_email: orderInfo.billing_email,
        billing_address: orderInfo.billing_address,
        billing_apartment: orderInfo.billing_apartment,
        billing_city: orderInfo.billing_city,
        billing_region: orderInfo.billing_region,
        billing_zipCode: orderInfo.billing_zipCode,
        billing_phoneNumber: orderInfo.billing_phoneNumber,
        address: orderInfo.address,
        firstName: orderInfo.firstName,
        lastName: orderInfo.lastName,
        phoneNumber: orderInfo.phoneNumber,
        region: orderInfo.region,
        city: orderInfo.city,
        countryName: orderInfo.shipping_country.country_name,
        zipCode: orderInfo.zipCode,
        currencyRate: orderInfo.currencyRate,
        currency: orderInfo.currency,
        apartment: orderInfo.apartment,
        product:
          cartItems.product?.map((item) => ({
            productName: item.productName,
            size: item.pivot.size.size,
            quantity: item.pivot.quantity,
            price: item.pivot.productPrice,
            productSKU: item.productSKU,
            media1: item.media1,
          })) || [],
      };

      await axios.post(
        "http://127.0.0.1:8000/api/orderConfirmation",
        emailInfo
      );
      await updateOrderStatus();
      navigateToThankYou(cartRefNumber);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  const navigateToThankYou = (cartRefNumber) => {
    navigate(`/order-successful/${cartRefNumber}`);
  };

  const updateOrderStatus = async () => {
    const res = await axios.post(
      `http://127.0.0.1:8000/api/order-status-update/${orderId}`,
      {
        status: "Invoiced",
        itemStatus: "Invoiced",
      }
    );
    return res.data;
  };

  return (
    <div className="text-[18px] md:text-[15px] gap-[5%] h-[70vh] w-[100%] flex  flex-col justify-center items-center">
      <img
        className="w-[50px] h-[110px]"
        src={Loader}
        alt="parrot-loader"
      ></img>
      <p className="w-[400px] md:w-[100%] md:p-[5%] text-center">
        Please do not close this tab, you will be automatically redirected to
        the website shortly.{" "}
      </p>
      <p>
        <strong> Thank you for your patience.</strong>
      </p>
    </div>
  );
}

export default OnlinePaymentRedirect;
