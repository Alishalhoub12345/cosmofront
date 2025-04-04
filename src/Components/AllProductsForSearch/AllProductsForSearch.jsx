import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loader from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import { useQuery } from "react-query";
import saleFlag from "../../images/Products/sales-flag-blue.png";
import { useTranslation } from "react-i18next";
import fallout from "../../images/Products/C-image-missing.png";

function AllProductsForSearch({ searchQuery }) {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
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
        .post("http://localhost:8000/api/currency-name", {
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

  const getAllProducts = async () => {
    let response;
    try {
      response = await axios.get(
        `http://localhost:8000/api/search-products/${page}`,
        {
          params: {
            query: searchQuery,
            productVisible: 1,
            locale: selectedLang, // Include the locale in the request
          },
        }
      );
      if (page === 1) {
        setAllProducts(response.data.data);
      } else {
        setAllProducts((prevProducts) => [
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
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [searchQuery, page, selectedLang]);

  useEffect(() => {
    setAllProducts([]);
    setPage(1);
    setMoreItems(true);
  }, [searchQuery, selectedLang]);

  const handleLoadMore = () => {
    setShowMoreLoading(true);
    if (moreItems) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div>
      <div className=" w-[100%]  flex items-center">
        <div
          className={`flex h-[50px] justify-end items-center  md:w-[100%] ${
            isArabic ? " w-[100%] text-[15px] " : "w-[600px] flex-row-reverse"
          }`}
        >
          <p
            className={` sm:text-[12px]  px-[2%] py-[0.5%] ${
              isArabic ? "text-[18px]" : ""
            }`}
          >
            {searchQuery}
          </p>

          <Link
            to="/products"
            className={`border-x-[1.5px] sm:text-[12px] uppercase  px-[2%] py-[0.5%] ${
              isArabic ? "border-l-[black] text-[18px]" : "border-r-[black]"
            }`}
          >
            <strong>{t("allProducts")}</strong>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-evenly items-center flex-col px-[7%]">
          <div className="min-h-[100vh] w-[95%] xl:min-h-[80vh] py-[7%]  h-[auto] flex-wrap flex justify-start md:justify-center gap-[4%]   items-start  flex-row font-[100] text-white font-[FahKwang]">
            {allProducts?.map((prodSearch, index) => (
              <div
                key={index}
                className="relative bg-[#eeeeee]  w-[21.5%]  md:w-[40%] mt-[0.1%] md:mt-[0.5%] "
              >
                {prodSearch.productSale && (
                  <div className="flex justify-center items-start absolute top-0 right-0 z-[1]">
                    <div className="flex  justify-center items-center py-[20%] w-[100%] text-center">
                      <img
                        className=" w-[7vw]  md:w-[15vw]"
                        src={saleFlag}
                        alt="sale-tag"
                      ></img>
                      <p className="leading-[1] font-[100] font-[FahKwang] text-[0.8vw] xl:text-[1vw]  md:text-[2vw] uppercase absolute  top-[42%] right-[30%]">
                        {prodSearch.productSale}%
                      </p>
                    </div>
                  </div>
                )}
                <>
                  <div className=" flex flex-col justify-between min-h-[20rem] xl:min-h-[15rem] lg:min-h-[10rem] my-[1%]">
                    <Link
                      to={`/single/product/${prodSearch.productLink}/${prodSearch.productSKU}`}
                    >
                      <div className="min-h-[20rem] xl:min-h-[15rem] lg:min-h-[10rem]  mt-[0.1%] md:mt-[0.5%] ">
                        <img
                          className=" w-[100%] h-[100%] object-cover "
                          src={`http://localhost:8000/api/storage/${prodSearch.media1}`}
                          alt={`${prodSearch.id}`}
                          onError={(e) => {
                            e.target.src = fallout;
                          }}
                        />
                      </div>
                    </Link>
                    {!prodSearch.totalQuantity &&
                      prodSearch.totalQuantity <= 0 && (
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
                        {prodSearch.productName}
                      </p>
                      {prodSearch.productSale ? (
                        <div
                          className={`flex gap-[2%] flex-col w-[100%]   ${
                            isArabic ? "text-right" : ""
                          }`}
                        >
                          <p className=" font-[FrutigerLTCom-Roman] xl:text-[10px]">
                            {(
                              (prodSearch.productPrice -
                                prodSearch.productPrice *
                                  (prodSearch.productSale / 100)) *
                              currencyValue
                            ).toFixed(2)}
                            {currencyUsed}
                          </p>
                          <p className=" text-[12px] xl:text-[10px]  font-[FrutigerLTCom-Roman] line-through text-[#a9a9a9]">
                            {(prodSearch.productPrice * currencyValue).toFixed(
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
                          {(prodSearch.productPrice * currencyValue).toFixed(2)}
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
                className="w-[200px] h-[55px] py-[2%] md:w-[150px] md:text-[12px] md:h-[40px] text-center bg-[#676f98] text-white font-bold uppercase hover:text-[#ea9e7e] hover:bg-[#2f4672]"
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
export default AllProductsForSearch;
