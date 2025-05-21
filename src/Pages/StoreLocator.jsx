// import React from "react";
// import Navbar from "../Components/Navbar/Navbar";
// import Footer from "../Components/Footer/Footer";

// const StoreLocator = () => {
//   const stores = [
//     {
//       name: "COSMO Beirut",
//       address: [
//         "Verdun 2000 Center, Ground Floor",
//         "Verdun Main Street, Beirut",
//       ],
//       phone: "+96181117733",
//       mapLink: "https://maps.app.goo.gl/fUYHAswreeDXvaBv9",
//     },
//     {
//       name: "COSMO Kaslik",
//       address: [
//         "Fahd Center, Ground Floor",
//         "Kaslik Main Street, Kaslik",
//       ],
//       phone: "+96171017011",
//       mapLink: "https://maps.app.goo.gl/dSNX4SQ9xmmksFaz6",
//     },
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="bg-[#f4f4f4] w-full px-[10%] py-[5%] font-[FahKwang]">
//         <h1 className="text-3xl lg:text-4xl text-[#082252] font-bold uppercase border-b-[2px] border-[#E79E7F] pb-[1%] mb-[5%] text-center">
//           Store Locator
//         </h1>

//         <div className="flex flex-wrap gap-5 justify-center">
//           {stores.map((store, index) => (
//             <div
//               key={index}
//               className="bg-white w-[750px] p-6 rounded-lg shadow-md border-l-[6px] border-[#E79E7F]"
//             >
//               <h2 className="text-2xl font-semibold text-[#082252] mb-3">
//                 {store.name}
//               </h2>
//               <p className="text-[#3e3e3e]">{store.address[0]}</p>
//               <p className="text-[#3e3e3e] mb-2">{store.address[1]}</p>
//               <p className="text-[#3e3e3e]">
//                 T.{" "}
//                 <a
//                   href={`tel:${store.phone}`}
//                   className="text-[#E79E7F] hover:underline"
//                 >
//                   {store.phone}
//                 </a>
//               </p>
//               <p>
//                 <a
//                   href={store.mapLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-[#E79E7F] hover:underline"
//                 >
//                   Google Maps Location
//                 </a>
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default StoreLocator;

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useTranslation } from "react-i18next";
import { LuMapPin } from "react-icons/lu"; // I added a map pin icon for each store location
import { LuPhone } from "react-icons/lu";

const StoreLocator = () => {
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
const stores = [
  {
    name: "COSMO Beirut",
    address: [
      "Verdun 2000 Center, Ground Floor",
      "Verdun Main Street, Beirut",
    ],
    phone: "+96181117733",
    mapLink: "https://maps.app.goo.gl/fUYHAswreeDXvaBv9",
  },
  {
    name: "COSMO Kaslik",
    address: [
      "Fahd Center, Ground Floor",
      "Kaslik Main Street, Kaslik",
    ],
    phone: "+96171017011",
    mapLink: "https://maps.app.goo.gl/dSNX4SQ9xmmksFaz6",
  },
];

return (
  <>
    <Navbar />
    <div
      className={`w-[100%] min-h-[80vh] px-[5%] lg:h-auto lg:py-[2%] pt-[2%] font-[FrutigerLTCom-Roman] ${
        isArabic ? "text-right" : ""
      }`}
    >
      <h1 className="text-[40px] font-[FahKwang] px-[2%] lg:text-[40px] md:text-[25px] mb-[3%]">
        Store Locator
      </h1>

      <div className="flex flex-wrap justify-between gap-[2%] px-[2%]">
        {stores.map((store, index) => (
          <div
            key={index}
            className="w-[48%] lg:w-[100%] p-[2%] bg-white rounded-[5px] flex flex-col justify-between shadow-md mb-[2%]"
          >
            <h2 className="text-[#082252] font-[FahKwang] font-[800] text-xl mb-3">
              {store.name}
            </h2>

<a
  href={store.mapLink}
  target="_blank"
  rel="noopener noreferrer"
  className={`flex items-center gap-[1%] mb-2 hover:underline ${isArabic ? "flex-row-reverse" : ""}`}
>
  <div className="flex justify-center bg-[#676F98] text-white rounded-full items-center w-[30px] h-[30px]">
    <LuMapPin className="w-[20px] h-[20px]" />
  </div>
  <div className="text-[#3e3e3e]">
    <p>{store.address[0]}</p>
    <p>{store.address[1]}</p>
  </div>
</a>


            <div
              className={`flex items-center gap-[1%] mb-2 ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <div className="flex justify-center bg-[#676F98] text-white rounded-full items-center w-[30px] h-[30px]">
                <LuPhone className="w-[27px] h-[20px]" />
              </div>
              <a
                href={`tel:${store.phone}`}
                className="text-[#E79E7F] hover:underline font-[FahKwang] font-[800]"
              >
                {store.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
  </>
);

};

export default StoreLocator;
