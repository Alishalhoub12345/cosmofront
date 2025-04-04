import { Link } from "react-router-dom";
import { CiLock } from "react-icons/ci";

function PasswordUpdatedSuccessfully() {
  return (
    <div className="w-[100%] h-[90%] absolute z-[2] flex justify-center items-center">
      <div className=" w-[450px] h-[300px] xl:right-[28%] xl:top-[40%] flex justify-center items-center">
        <div className="bg-white w-[80%] h-[100%] flex justify-center items-center flex-col gap-[3%]">
          <div className=" flex justify-center items-center flex-col">
            <div className=" w-[70px] bg-[#D1D4E0] h-[70px] rounded-full flex items-center justify-center">
              <div className=" w-[55px] bg-[#B1B6CA] h-[55px] rounded-full flex items-center justify-center">
                <div className="  bg-[#656E9A] w-[40px] h-[40px] rounded-full flex items-center justify-center ">
                  <div className=" flex justify-center items-center text-white text-[22px]">
                   <CiLock/>
                  </div>
                </div>
              </div>
            </div>

            <p className=" font-[600]  text-center">
              Password Changed Successfully
            </p>
          </div>
          <p className="text-center">
            Your password has been updated successfully
          </p>
          <div className="w-[100%] h-[40px] flex items-center justify-center">
            <Link
              to="/login"
              className=" w-[90%] h-[40px] text-white
                  bg-[#676f98] hover:bg-[#2f4672]
                  hover:text-[#E79E7F] flex justify-center items-center"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordUpdatedSuccessfully;
