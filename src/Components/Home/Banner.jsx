import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const API = "https://www.cosmo.global/laravel/api"; // adjust if needed

function Banner() {
  const [t, i18n] = useTranslation("global");
  const isArabic = localStorage.getItem("lang") === "ar";

  const [mediaUrl, setMediaUrl] = useState(null);    // absolute URL from API
  const [mediaType, setMediaType] = useState(null);  // "image" | "video"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) i18n.changeLanguage(selectedLang);

    (async () => {
      try {
        const { data } = await axios.get(`${API}/home-page-images`, {
          headers: { Accept: "application/json" },
        });

        const items = Array.isArray(data?.data) ? data.data : [];

        const MIDDLE_INDEX = 0;
        const main = items[MIDDLE_INDEX] ?? items[0] ?? null;

if (main?.image) {
  // Detect if it's video or image (optional)
  const ext = main.image.split('.').pop().toLowerCase();
  const kind = ['mp4','webm','ogg','mov','mkv'].includes(ext) ? 'video' : 'image';

  setMediaType(kind);

  // Build the full URL yourself
  setMediaUrl(`https://cosmo.global/laravel/api/storage/${main.image}`);
}
 else {
          setMediaType(null);
        }
      } catch (err) {
        console.error("Failed to load homepage media:", err);
        setMediaType(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [i18n]);

  return (
    <div>
      <div className="w-[99.9%] h-[80vh] lg:h-[50vh] md:h-[30vh]">
        {loading ? null : mediaType === "video" ? (
          <video
            className="w-[100%] h-[100%] object-cover"
            src={mediaUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : mediaType === "image" ? (
          <img
            className="w-[100%] h-[100%] object-cover"
            alt="banner"
            src={mediaUrl}
          />
        ) : null}
      </div>

      <div className="flex justify-center items-center w-[100%] flex-col py-[2%]">
        {/* <img
          src={parrot}
          className="w-[190px] md:w-[140px] sm:w-[100px]"
          alt="parrot-icon"
        /> */}
        <p
          className={`text-[20px] text-[#082252] font-[FrutigerLTCom-Roman] w-[40%] text-center pb-[5%] lg:pb-[10%] xl:w-[80%] md:text-[18px] md:w-[90%] sm:text-[15px] ${
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
