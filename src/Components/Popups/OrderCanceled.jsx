import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
function OrderCanceled() {
  const { orderId } = useParams();

  useEffect(() => {
    updateOrderStatusToCanceled();
    const isLoggedIn =
      localStorage.getItem("firstName") && localStorage.getItem("clientInfo");

    Object.keys(localStorage).forEach((key) => {
      if (isLoggedIn) {
        if (
          key !== "currencyUsed" &&
          key !== "firstName" &&
          key !== "clientInfo"
        ) {
          localStorage.removeItem(key);
        }
      } else {
        if (key !== "currencyUsed") {
          localStorage.removeItem(key);
        }
      }
    });
    window.dispatchEvent(new Event("storage"));
  }, []);

  const updateOrderStatusToCanceled = async () => {
    const res = await axios.post(
      `http://127.0.0.1:8000/api/order-status-canceled/${orderId}`
    );
    return res.data;
  };
  return (
    <div className="w-[100%] h-[90vh]">
      <div className="w-[100%] h-[90%] absolute z-[2] flex justify-center items-center">
        <div className=" w-[450px] h-[300px] xl:right-[28%] xl:top-[40%] flex justify-center items-center">
          <div className="bg-white w-[80%] h-[100%] flex justify-center items-center flex-col gap-[3%]">
            <div className=" flex justify-center items-center flex-col">
              <div className=" w-[70px] bg-[#D1D4E0] h-[70px] rounded-full flex items-center justify-center">
                <div className=" w-[55px] bg-[#B1B6CA] h-[55px] rounded-full flex items-center justify-center">
                  <div className="  bg-[#656E9A] w-[40px] h-[40px] rounded-full flex items-center justify-center ">
                    <div className=" w-[20px] flex justify-center items-center ">
                      <AiOutlineClose className="text-white text-[20px]" />
                    </div>
                  </div>
                </div>
              </div>

              <p className=" font-[600]  text-center">Order Canceled</p>
            </div>
            <p className="text-center"> Your order has been canceled</p>
            <div className="w-[100%] h-[40px] flex items-center justify-center">
              <Link
                to="/"
                className=" w-[90%] h-[40px] text-white
                    bg-[#676f98] hover:bg-[#2f4672]
                    hover:text-[#E79E7F] flex justify-center items-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCanceled;
