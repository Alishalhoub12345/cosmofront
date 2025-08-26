import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import loginImage from "../../images/Authentication/login-bag.png";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { IoEyeOffOutline } from "react-icons/io5";
import PasswordUpdatedSuccessfully from "../Popups/PasswordUpdatedSuccessfully";

function ResetPassword() {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const { userId } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updateResponse, setUpdateResponse] = useState(false);
  const [error, setError] = useState("");

  const PREFIX_LENGTH = 100;
  const SUFFIX_LENGTH = 8;

  const extractUserId = (obfuscatedUserId) => {
    return obfuscatedUserId.slice(
      PREFIX_LENGTH,
      obfuscatedUserId.length - SUFFIX_LENGTH
    );
  };

  const obfuscatedUser = userId;
  const user = obfuscatedUser ? extractUserId(obfuscatedUser) : null;

  const handleForgotPasswordUpdate = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/reset-password-update/${user}`,
        {
          password: newPassword,
        }
      );
      setLoadingUpdate(false);
      if (res.status === 200) {
        setUpdateResponse(true);
        await axios.post(
          `http://127.0.0.1:8000/api/email-after-reseting-password`,
          {
            email: res.data.email,
          }
        );
      } else {
        setError("Invalid user ID. Please try again.");
      }
      return res.data;
    } catch (error) {
      setLoadingUpdate(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="w-[100%] h-[90vh]">
        {updateResponse ? (
          <PasswordUpdatedSuccessfully />
        ) : (
          <div className="w-[100%] lg:h-[auto] h-[90vh] flex-wrap font-[FrutigerLTCom-Roman] flex items-center justify-center bg-[#F1F5FF]">
            <div className="w-[50%] lg:w-[100%] h-[100%] p-[5%] xl:px-[0%] flex justify-center items-center flex-col">
              <div className="w-[80%]  xl:w-[100%] h-[100%] flex justify-start items-center flex-col">
                <div className="w-[80%] lg:w-[95%]">
                  <h1 className="font-[FahKwang] text-[40px] md:text-[8vw]">
                    RESET PASSWORD
                  </h1>
                  <p className="text-[15px]">
                    Please add your new password below.
                  </p>
                </div>
                <form
                  className="w-[80%] lg:w-[95%] h-[250px] flex justify-start flex-col"
                  onSubmit={handleForgotPasswordUpdate}
                >
                  <div className=" flex flex-col justify-evenly h-[100%]">
                    <div className="flex justify-start flex-col pt-[1%] relative">
                      <label className=" h-[30px] flex items-center">
                        Password{" "}
                        <span className=" h-[100%] text-[#E79E7F]">*</span>
                      </label>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="h-[40px] p-[2%] bg-[#F1F5FF] border-[1px] border-[black] rounded-[2px] pr-[30px]"
                        value={newPassword}
                        autoComplete="pass"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      {showNewPassword ? (
                        <IoEyeOffOutline
                          className="absolute hover:text-[#E79E7F] right-[10px] top-[70%] transform translate-y-[-50%] cursor-pointer"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                      ) : (
                        <AiOutlineEye
                          className="absolute hover:text-[#E79E7F] right-[10px] top-[70%] transform translate-y-[-50%] cursor-pointer"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                      )}
                    </div>
                    {error && (
                      <p className="text-[#E79E7F] text-[12px]">{error}</p>
                    )}
                    <div className="flex items-center justify-between flex-col h-[80px]">
                      <button
                        className=" w-[100%] h-[40px] text-white
                  bg-[#676f98] hover:bg-[#2f4672]
                  hover:text-[#E79E7F]"
                        disabled={loadingUpdate}
                      >
                        {loadingUpdate ? "Loading..." : "Update Password"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-[50%] lg:w-[100%] h-[100%]">
              <img
                src={loginImage}
                alt="login"
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ResetPassword;
