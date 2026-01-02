import React from 'react'
import { Link } from 'react-router-dom';

function DoesntExist() {
  return (
    <div className="h-[70vh] flex-col w-[100%] flex justify-center items-center text-center ">
      <h1 className='text-[60px] md:w-[100%] font-[FahKwang] xl:text-[35px] md:text-[25px] '>404 Not Found</h1>
      <p className='text-[20px] md:text-[12px] pb-[2%]'>The page you are looking for doesn't exist.</p>
      <div className="w-[100%] h-[40px] flex items-center justify-center">
        <Link
          to="/"
          className=" w-[200px] h-[40px] text-white
                    bg-[#676f98] hover:bg-[#2f4672]
                    hover:text-[#082252] flex justify-center items-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default DoesntExist