import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
import loaderParrot from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function CollectionCarousel() {
  const [t, i18n] = useTranslation("global");
  const selectedLang = localStorage.getItem("lang");

  const getCollection = async () => {
    const res = await axios.get("https://www.cosmo.global/laravel/api/collection", {
      params: { locale: selectedLang },
    });
    return res.data.message;
  };

  const { data: collection, loaderCollection } = useQuery(
    "allCollectionsCarousel",
    getCollection
  );

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
        <div className=" h-[500px] flex justify-center items-center">
          <img
            className="w-[50px] pt-[5%] pb-[20%]"
            src={loaderParrot}
            alt="loaderParrot"
          ></img>
        </div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={2}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            700: {
              slidesPerView: 2,
            },
            1300: {
              slidesPerView: 3,
            },
          }}
        >
          {collection &&
            collection.map((coll, index) => (
              <SwiperSlide key={coll.id} className="relative">
                <div className="relative text-[white]">
                  <div className=" h-[550px] xl:h-[400px]  sm:h-[250px]">
                    <img
                      className="bg-[black]"
                      src={`https://www.cosmo.global/laravel/api/storage/${coll.collectionImage}`}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>

                  <Link
                    to={`/collection/${coll.collectionLink}`}
                    className="absolute inset-0 bg-[#1d34569c] hover:bg-[#677eabb5] flex justify-center items-center"
                  >
                    <div className="text-center">
                      <p className="font-[200] text-[35px] xl:text-[3vw] lg:text-[4vw] md:text-[6vw] sm:text-[7vw] w-[100%] font-[FahKwang]">
                        {coll.collectionName}
                      </p>
                      <Link
                        to={`/collection/${coll.collectionLink}`}
                        className="font-[FrutigerLTCom-Roman] text-[15px] xl:text-[1vw] lg:text-[1.5vw] md:text-[2vw] sm:text-[2.5vw] border-b-[1px] pt-[5%]"
                      >
                        {t("homePage.shopNow")}
                      </Link>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}

export default CollectionCarousel;
