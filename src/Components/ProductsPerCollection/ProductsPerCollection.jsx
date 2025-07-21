import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loader from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import Clogo from "../../images/Collection/C-peach.png";
import saleFlag from "../../images/Products/sales-flag-blue.png";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import fallout from "../../images/Products/C-image-missing.png";

function ProductsPerCollection() {
  const { collectionLink } = useParams();
  const [page, setPage] = useState(1);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [moreItems, setMoreItems] = useState(true);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [currencyValue, setCurrencyValue] = useState(1);
  const currencyUsed = localStorage.getItem("currencyUsed");
  const [t, i18n] = useTranslation("global");
  const selectedLang = localStorage.getItem("lang");
  const isArabic = localStorage.getItem("lang") === "ar";

  useEffect(() => {
    const currencyUsed = localStorage.getItem("currencyUsed");
    if (currencyUsed) {
      axios
        .post("http://127.0.0.1:8000/api/currency-name", {
          currency_name: currencyUsed,
        })
        .then((response) => {
          setCurrencyValue(response.data.currency_value);
        })

        .catch((error) => {
          console.error("Error fetching currency value:", error);
        });
    }
  }, []);

  const getProductsPerCollection = async () => {
    let response;
    try {
      response = await axios.get(
        `http://127.0.0.1:8000/api/collection/${collectionLink}/products/${page}?productVisible=1`,
        {
          params: { locale: selectedLang },
        }
      );

      if (page === 1) {
        setCollectionProducts(response.data.data);
      } else {
        setCollectionProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.data,
        ]);
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    } finally {
      setShowMoreLoading(false);
      if (page > 1 && response.data.data.length === 0) {
        setMoreItems(false);
        // setNoMoreItems(true);
      }
    }
  };

  const getCollectionName = async () => {
    const subcategoryRes = await axios.get(
      `http://127.0.0.1:8000/api/collection/name/${collectionLink}`,
      {
        params: { locale: selectedLang },
      }
    );

    return subcategoryRes.data;
  };

  const { data: collectionTitle } = useQuery(
    ["products", collectionLink],
    getCollectionName
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      // setInitialLoadingComplete(true);
    }, 3000);
  }, [collectionLink]);

  useEffect(() => {
    getProductsPerCollection();
  }, [collectionLink, page]);

  useEffect(() => {
    setCollectionProducts([]);
    setPage(1);
    setMoreItems(true);
  }, [collectionLink]);

  const handleLoadMore = () => {
    setShowMoreLoading(true);
    if (moreItems) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="">
      <div className=" w-[100%] uppercase flex items-center  h-[60px]">
        <div
          className={`flex h-[50px] justify-end items-center  md:w-[100%] ${
            isArabic ? " w-[100%] text-[15px] " : "w-[600px] flex-row-reverse"
          }`}
        >
          {collectionTitle && (
            <p className="px-[2%] py-[0.5%] sm:text-[12px] hover:cursor-pointer">
              {collectionTitle.collection.collectionName}
            </p>
          )}
          {console.log(
            "collection TITLE",
            collectionTitle?.collection?.departments[0].departmentName
          )}
          <Link
            to={`/products/department/${collectionTitle?.collection?.departments[0].departmentLink}`}
            className={`border-x-[1.5px] sm:text-[12px]  px-[2%] py-[0.5%] hover:cursor-pointer ${
              isArabic ? "border-l-[black]" : "border-r-[black]"
            }`}
          >
            <strong>
              {isArabic
                ? collectionTitle?.collection?.departments[0].departmentName_ar
                : collectionTitle?.collection?.departments[0].departmentName}
            </strong>
          </Link>
        </div>
      </div>
      {loading ? (
        <>
          {collectionTitle && (
            <div className="w-[100%]  min-h-[100vh] h-[auto]  px-[7%] py-[3%]  flex-wrap flex items-start justify-evenly  gap-[0.15%] flex-row  font-[100] text-white font-[FrutigerLTCom-Roman]">
              <div
                className={` px-[0.6%] lg:w-[93%] md:w-[88%] mb-[3%]  gap-[4.2%] flex lg:flex-col-reverse lg:h-[auto] justify-center ${
                  isArabic ? "flex-row-reverse items-end" : ""
                }`}
              >
                <div className=" w-[69%] lg:w-[100%]">
                  <img
                    className="object-cover w-[100%]  h-[100%]"
                    alt="collection-main-image"
                    src={`http://127.0.0.1:8000/api/storage/${collectionTitle.collection.collectionImage}`}
                  />
                </div>

                <div
                  className={` md:pt-[0%] relative w-[20%] lg:w-[80%] md:w-[100%]  pt-[5%] md:py-[0%] min-h-[20rem] xl:min-h-[15rem] lg:min-h-[10rem] md:min-h-[7rem] sm:min-h-[6rem]  py-[3%]  mt-[0.4%] text-black flex justify-center md:justify-start flex-col ${
                    isArabic ? "text-right " : "items-start "
                  }`}
                >
                  <h1
                    className={` font-[FahKwang] leading-[1] lg:text-[4.5vw] ${
                      isArabic
                        ? "text-[3vw]"
                        : " w-[80%] md:w-[100%] text-[2vw] 2xl:w-[100%] "
                    }`}
                  >
                    {isArabic
                      ? collectionTitle.collection.collectionTitle_ar
                      : collectionTitle.collection.collectionTitle}
                  </h1>
                  <h2 className=" w-[100%] text-[1.2vw] lg:text-[2.5vw]">
                    {isArabic
                      ? collectionTitle.collection.collectionSubtitle_ar
                      : collectionTitle.collection.collectionSubtitle}
                  </h2>
                  <p
                    className={` pt-[5%] md:py-2 md:text-[10px] lg:w-[100%] leading-[1] ${
                      isArabic
                        ? "xl:text-[12px] text-[18px]"
                        : "xl:text-[12px] text-[15px]"
                    }`}
                  >
                    {isArabic
                      ? collectionTitle.collection.collectionDescription_ar
                      : collectionTitle.collection.collectionDescription}
                  </p>
                  <div
                    className={`flex justify-center items-center lg:hidden w-[100%]`}
                  >
                    <img
                      src={Clogo}
                      className={` ${isArabic ? "w-[50%]" : "w-[40%]"}`}
                      alt="cosmo-C-Logo"
                    ></img>
                  </div>
                </div>
              </div>
              {collectionProducts &&
                collectionProducts?.map((singleColl) => (
                  <div
                    key={singleColl.id}
                    className="relative bg-[#eeeeee]  w-[20%]  md:w-[40%]  mt-[0.1%] md:mt-[0.5%] "
                  >
                    {singleColl.productSale && (
                      <div className="flex justify-center items-start absolute top-0 right-0 z-[1]">
                        <div className="flex  justify-center items-center py-[20%] w-[100%] text-center">
                          <img
                            className=" w-[7vw]  md:w-[15vw]"
                            src={saleFlag}
                            alt="sale-tag"
                          ></img>
                          <p className="leading-[1] font-[100] font-[FahKwang] text-[0.8vw] xl:text-[1vw]  md:text-[2vw] uppercase absolute  top-[42%] right-[30%]">
                            {singleColl.productSale}%
                          </p>
                        </div>
                      </div>
                    )}
                    <>
                      <div className=" flex flex-col justify-between min-h-[20rem] xl:min-h-[15rem] lg:min-h-[10rem] sm:min-h-[5rem] my-[1%]">
                        <Link
                          to={`/single/product/${singleColl.productLink}/${singleColl.productSKU}`}
                        >
                          <div className="min-h-[20rem] xl:min-h-[15rem] lg:min-h-[10rem] sm:min-h-[5rem] mt-[0.1%] md:mt-[0.5%] ">
                            <img
                              className=" w-[100%] h-[100%] object-cover "
                              src={`http://127.0.0.1:8000/api/storage/${singleColl.media1}`}
                              alt={`${singleColl.id}`}
                              onError={(e) => {
                                e.target.src = fallout;
                              }}
                            />
                          </div>
                        </Link>
                        {!singleColl.totalQuantity &&
                          singleColl.totalQuantity <= 0 && (
                            <>
                              <div className="flex justify-center items-center w-full h-[90%] xl:h-[80%] absolute top-0 left-0 z-[1]">
                                <div className="flex justify-center items-center p-[5%] w-[100%] text-center overlay bg-opacity-50 bg-[#223574bd] opacity-[700]">
                                  <p className="leading-[1] font-[100] font-[FahKwang] text-[1.5vw] md:text-[4vw] uppercase">
                                    {t("soldOut")}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        <div className=" h-[75px] xl:h-[70px] md:h-[60px] py-[3%] text-black ">
                          <p
                            className={`leading-[1] font-[100]  uppercase ${
                              isArabic
                                ? "text-[18px] xl:text-[15px] md:text-[12px] text-right"
                                : "xl:text-[12px] sm:text-[10px]"
                            }`}
                          >
                            {singleColl.productName}
                          </p>
                          {singleColl.productSale ? (
                            <div
                              className={`flex gap-[2%] flex-col w-[100%]   ${
                                isArabic ? "text-right" : ""
                              }`}
                            >
                              <p className=" font-[FrutigerLTCom-Roman] xl:text-[10px]">
                                {(
                                  (singleColl.productPrice -
                                    singleColl.productPrice *
                                      (singleColl.productSale / 100)) *
                                  currencyValue
                                ).toFixed(2)}
                                {currencyUsed}
                              </p>
                              <p className=" text-[12px] xl:text-[10px]  font-[FrutigerLTCom-Roman] line-through text-[#a9a9a9]">
                                {(
                                  singleColl.productPrice * currencyValue
                                ).toFixed(2)}
                                {currencyUsed}
                              </p>
                            </div>
                          ) : (
                            <p
                              className={` w-[100%] xl:text-[10px] font-[FrutigerLTCom-Roman] ${
                                isArabic ? "text-right" : ""
                              }`}
                            >
                              {(
                                singleColl.productPrice * currencyValue
                              ).toFixed(2)}
                              {currencyUsed}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  </div>
                ))}
            </div>
          )}
          <div className="p-[2%] flex justify-center items-center">
            {moreItems && (
              <button
                onClick={handleLoadMore}
                className="w-[200px] py-[1%] md:py-[3%] md:w-[150px] md:text-[12px] text-center bg-[#676f98] text-white font-bold uppercase hover:text-[#ea9e7e] hover:bg-[#2f4672]"
                disabled={showMoreLoading}
              >
                {showMoreLoading ? "Loading..." : "Show More"}
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="h-[80vh] flex justify-center items-center text-[black]">
            <img
              className="w-[50px] md:w-[30px] sm:w-[20px]"
              src={loader}
              alt="parrot-loader"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsPerCollection;
