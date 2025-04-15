import { useEffect, useState } from "react";
import parrot from "../../images/Home/parrot peach.png";
import { useTranslation } from "react-i18next";
import bannerData from "./bannerMedia"; // Adjust path to match your project

function Banner() {
  const [t, i18n] = useTranslation("global");
  const isArabic = localStorage.getItem("lang") === "ar";
  const [mediaSrc, setMediaSrc] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }

    const { src } = bannerData;

    if (src) {
      const ext = src.split(".").pop().toLowerCase();
      const isVideo = ["mp4", "webm", "ogg"].includes(ext);
      const folder = isVideo ? "videos" : "Home";

      import(`../../images/${folder}/${src}`)
        .then((file) => {
          setMediaType(isVideo ? "video" : "image");
          setMediaSrc(file.default);
        })
        .catch((error) => {
          console.error("Media loading failed:", error);
        });
    }
  }, [i18n]);

  return (
    <div className="">
      <div className="w-[99.9%] h-[80vh] lg:h-[50vh] md:h-[30vh]">
        {mediaType === "video" ? (
          <video
            className="w-[100%] h-[100%] object-cover"
            src={mediaSrc}
            autoPlay
            loop
            muted
          />
        ) : mediaType === "image" ? (
          <img
            className="w-[100%] h-[100%] object-cover"
            alt="banner"
            src={mediaSrc}
          />
        ) : null}
      </div>

      <div className="flex justify-center items-center w-[100%] flex-col py-[2%]">
        <img
          src={parrot}
          className="w-[190px] md:w-[140px] sm:w-[100px]"
          alt="parrot-icon"
        />
        <p
          className={`text-[20px] font-[FrutigerLTCom-Roman] w-[40%] text-center pb-[5%] lg:pb-[10%] xl:w-[80%] md:text-[18px] md:w-[90%] sm:text-[15px] ${
            isArabic ? "text-[25px]" : ""
          }`}
        >
          {t("homePage.ourBrands")}
        </p>
      </div>
    </div>
  );
}

export default Banner;
