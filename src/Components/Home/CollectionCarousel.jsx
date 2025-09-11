import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";

import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import loaderParrot from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function CollectionCarousel() {
  const [t, i18n] = useTranslation("global");
  const selectedLang = localStorage.getItem("lang");

  const getCollection = async () => {
    const res = await axios.get(
      "https://www.cosmo.global/laravel/api/collection",
      { params: { locale: selectedLang } }
    );
    return res.data.message;
  };

  const {
    data: collection,
    isLoading: loaderCollection,
    isError,
  } = useQuery("allCollectionsCarousel", getCollection);

  useEffect(() => {
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [i18n]);

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-[3vw] pb-[2%] font-[400] font-[FahKwang] xl:text-[35px] md:text-[8vw]">
        {t("homePage.ourCollection")}
      </h1>

      {loaderCollection ? (
        <div className="h-[500px] flex justify-center items-center">
          <img
            className="w-[50px] pt-[5%] pb-[20%]"
            src={loaderParrot}
            alt="loaderParrot"
          />
        </div>
      ) : isError ? (
        <div className="py-12 text-red-600">
          {t("common.error") ?? "Error loading collections."}
        </div>
      ) : (
        <div className="relative w-full">
<Swiper
  slidesPerView={1}
  spaceBetween={2}
  freeMode={true}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 700,
    disableOnInteraction: false,   // keep autoplay after interactions
    pauseOnMouseEnter: false,      // don't pause on hover
  }}
  loop={true}                       // wrap to beginning seamlessly
  navigation={{
    nextEl: ".collections-swiper-next",
    prevEl: ".collections-swiper-prev",
  }}
  modules={[Autoplay, Navigation]}
  className="mySwiper"
  breakpoints={{
    700: { slidesPerView: 2 },
    1300: { slidesPerView: 3 },
  }}
>


            {collection &&
              collection.map((coll, index) => (
                <SwiperSlide key={coll.id} className="relative">
                  <div className="relative text-white">
                    <div className="h-[550px] xl:h-[400px] sm:h-[250px]">
                      <img
                        className="bg-black w-full h-full object-cover"
                        src={`https://www.cosmo.global/laravel/api/storage/${coll.collectionImage}`}
                        alt={`Slide ${index + 1}`}
                        loading="lazy"
                      />
                    </div>
                    <Link
                      to={`/collection/${coll.collectionLink}`}
                      className="absolute inset-0 bg-[#1d34569c] hover:bg-[#677eabb5] flex justify-center items-center"
                    >
                      <div className="text-center">
                        <p className="font-[200] text-[35px] xl:text-[3vw] lg:text-[4vw] md:text-[6vw] sm:text-[7vw] font-[FahKwang]">
                          {coll.collectionName}
                        </p>
                        <span className="inline-block font-[FrutigerLTCom-Roman] text-[15px] xl:text-[1vw] lg:text-[1.5vw] md:text-[2vw] sm:text-[2.5vw] border-b-[1px] pt-[5%]">
                          {t("homePage.shopNow")}
                        </span>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Arrows -> only visible on lg and up */}
          <button
            type="button"
            aria-label="Previous"
            className="collections-swiper-prev lg:flex items-center justify-center
                       absolute left-2 top-1/2 z-[5] text-[#ffffff] hover:text-[#ffffff] transition"
          >
            <IoChevronBack className="text-2xl" />
          </button>

          <button
            type="button"
            aria-label="Next"
            className="collections-swiper-next lg:flex items-center justify-center
                       absolute right-2 top-1/2 z-[5] text-[#ffffff] hover:text-[#ffffff] transition"
          >
            <IoChevronForward className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CollectionCarousel;
