import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loader from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import { useQuery } from "react-query";
import saleFlag from "../../images/Products/sales-flag-blue.png";
import { useTranslation } from "react-i18next";
import fallout from "../../images/Products/C-image-missing.png";

function ProductsPerCategory() {
  const { categoryLink } = useParams();
  const [page, setPage] = useState(1);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  // const [moreItems, setMoreItems] = useState(false);
  // const [noMoreItems, setNoMoreItems] = useState(false);
  // const [initialLoadingComplete, setInitialLoadingComplete] = useState(false);
  const [moreItems, setMoreItems] = useState(true);
  const [currencyValue, setCurrencyValue] = useState(1);
  const currencyUsed = localStorage.getItem("currencyUsed");
  const [t, i18n] = useTranslation("global");
  const selectedLang = localStorage.getItem("lang");
  const isArabic = localStorage.getItem("lang") === "ar";
  useEffect(() => {
    const currencyUsed = localStorage.getItem("currencyUsed");
    if (currencyUsed) {
      axios
        .post("https://www.cosmo.global/laravel/api/currency-name", {
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

  const getCategoryName = async () => {
    const res = await axios.get(
      `https://www.cosmo.global/laravel/api/CategoryCorrespondingDepand/${categoryLink}`,
      {
        params: { locale: selectedLang },
      }
    );

    const categoryData = res.data;

    return categoryData;
  };

  const { data: categoryData } = useQuery(
    ["products", categoryLink],
    getCategoryName
  );

  const getProductsPerCategory = async () => {
    let response;
    try {
      response = await axios.get(
        `https://www.cosmo.global/laravel/api/categories/${categoryLink}/products/${page}?productVisible=1`,
        {
          params: { locale: selectedLang },
        }
      );
      if (page === 1) {
        setCategoryProducts(response.data.data);
      } else {
        setCategoryProducts((prevProducts) => [
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
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 3000);
  }, [categoryLink]);

  useEffect(() => {
    getProductsPerCategory();
  }, [categoryLink, page]);

  useEffect(() => {
    setCategoryProducts([]);
    setPage(1);
    setMoreItems(true);
  }, [categoryLink]);

  const handleLoadMore = () => {
    setShowMoreLoading(true);
    if (moreItems) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <div className=" w-[100%] uppercase flex items-center">
        {categoryData?.departments?.map((department) => (
          <div
            className={`flex h-[50px] justify-end items-center  md:w-[100%] ${
              isArabic ? " w-[100%] text-[15px] " : "w-[600px] flex-row-reverse"
            }`}
            key={department.id}
          >
            {categoryData && (
              <p className="px-[2%] py-[0.5%] sm:text-[12px] hover:cursor-pointer">
                {categoryData.categoryName}
              </p>
            )}
            <Link
              to={`/products/department/${department.departmentLink}`}
              className={`border-x-[1.5px] sm:text-[12px]  px-[2%] py-[0.5%] ${
                isArabic ? "border-l-[black]" : "border-r-[black]"
              }`}
            >
              <strong>{department.departmentName}</strong>
            </Link>
          </div>
        ))}
      </div>

      {loading ? (
        <div>
          <div className="min-h-[100vh] px-[7%] py-[3%]  h-[auto] flex-wrap flex justify-evenly items-start gap-[0.1%] flex-row font-[100] text-white font-[FahKwang]">
            {categoryProducts?.map((singleColl, index) => (
              <div
                key={index}
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
                  <div className=" flex flex-col justify-between min-h-[20rem] xl:min-h-[15rem] lg:min-h-[10rem]  my-[1%]">
                    <Link
                      to={`/single/product/${singleColl.productLink}/${singleColl.productSKU}`}
                    >
                      <div className="min-h-[20rem] xl:min-h-[15rem] lg:min-h-[10rem] sm:min-h-[5rem] mt-[0.1%] md:mt-[0.5%] ">
                        <img
                          className=" w-[100%] h-[100%] object-cover "
                          src={`https://www.cosmo.global/laravel/api/storage/${singleColl.media1}`}
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
                            {(singleColl.productPrice * currencyValue).toFixed(
                              2
                            )}
                            {currencyUsed}
                          </p>
                        </div>
                      ) : (
                        <p
                          className={` w-[100%] xl:text-[10px] font-[FrutigerLTCom-Roman] ${
                            isArabic ? "text-right" : ""
                          }`}
                        >
                          {(singleColl.productPrice * currencyValue).toFixed(2)}
                          {currencyUsed}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              </div>
            ))}
          </div>
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
        </div>
      ) : (
        <div className="h-[80vh] flex justify-center items-center text-[black]">
          <img
            className="w-[50px] md:w-[30px] sm:w-[20px]"
            src={loader}
            alt="parrot-loader"
          />
        </div>
      )}
    </div>
  );
}

export default ProductsPerCategory;
