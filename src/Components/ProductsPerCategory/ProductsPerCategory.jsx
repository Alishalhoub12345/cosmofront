import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loader from "../../images/Loader/cosmo_website_loader_transparent_Fast.gif";
import saleFlag from "../../images/Products/sales-flag-blue.png";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import fallout from "../../images/Products/C-image-missing.png";

function ProductsPerCategory() {
  const { categoryLink } = useParams();
  const [page, setPage] = useState(1);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreItems, setMoreItems] = useState(true);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [currencyValue, setCurrencyValue] = useState(1);
  const [currencyUsed, setCurrencyUsed] = useState(localStorage.getItem("currencyUsed") || "USD");
  const [t, i18n] = useTranslation("global");
  const selectedLang = localStorage.getItem("lang");
  const isArabic = selectedLang === "ar";

  // Fetch currency conversion value
  const fetchCurrencyRate = async () => {
    const currentCurrency = localStorage.getItem("currencyUsed") || "USD";
    setCurrencyUsed(currentCurrency);

    try {
      const res = await axios.post("https://www.cosmo.global/laravel/api/currency-value", {
        currency_name: currentCurrency,
      });
      setCurrencyValue(res.data.currency_value);
    } catch (err) {
      console.error("Error fetching currency value:", err);
      setCurrencyValue(1);
    }
  };

  // Fetch on mount + listen for localStorage changes
useEffect(() => {
  const currency = localStorage.getItem("currencyUsed");
  if (currency) {
    axios
      .post("https://www.cosmo.global/laravel/api/currency-name", {
        currency_name: currency,
      })
      .then((response) => {
        setCurrencyValue(response.data.currency_value);
      })
      .catch((error) => {
        console.error("Error fetching currency value:", error);
      });
  }
}, []);


  // Fetch category info (departments + name)
  const getCategoryInfo = async () => {
    const response = await axios.get(
      `https://www.cosmo.global/laravel/api/CategoryCorrespondingDepand/${categoryLink}`,
      { params: { locale: selectedLang } }
    );
    return response.data;
  };

  const { data: categoryData } = useQuery(
    ["categoryData", categoryLink],
    getCategoryInfo
  );

  // Fetch paginated products by category
  const getProductsPerCategory = async () => {
    try {
      const response = await axios.get(
        `https://www.cosmo.global/laravel/api/categories/${categoryLink}/products/${page}?productVisible=1`,
        { params: { locale: selectedLang } }
      );

      if (page === 1) {
        setCategoryProducts(response.data.data);
      } else {
        setCategoryProducts((prev) => [...prev, ...response.data.data]);
      }

      if (page > 1 && response.data.data.length === 0) {
        setMoreItems(false);
      }
    } catch (err) {
      console.error("Error loading products per category:", err);
    } finally {
      setShowMoreLoading(false);
      setLoading(true);
    }
  };

  // Loader simulation
  useEffect(() => {
    const delayLoad = setTimeout(() => {
      setLoading(true);
    }, 3000);
    return () => clearTimeout(delayLoad);
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
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className="w-[100%] uppercase flex items-center">
        {categoryData?.departments?.map((department) => (
          <div
            key={department.id}
            className={`flex h-[50px] justify-end items-center md:w-[100%] ${
              isArabic ? "w-[100%] text-[15px]" : "w-[600px] flex-row-reverse"
            }`}
          >
            {categoryData && (
              <p className="px-[2%] py-[0.5%] sm:text-[12px]">
                {categoryData.categoryName}
              </p>
            )}
            <Link
              to={`/products/department/${department.departmentLink}`}
              className={`border-x-[1.5px] sm:text-[12px] px-[2%] py-[0.5%] ${
                isArabic ? "border-l-[#082252]" : "border-r-[#082252]"
              }`}
            >
              <strong>{department.departmentName}</strong>
            </Link>
          </div>
        ))}
      </div>

      {loading ? (
        <div>
          <div className="min-h-[100vh] px-[7%] py-[3%] flex-wrap flex justify-evenly items-start gap-[0.1%] flex-row font-[100] text-white font-[FahKwang]">
            {categoryProducts.map((product) => (
              <div
                key={product.productSKU || product.id}
                className="relative bg-[#eeeeee] w-[20%] md:w-[40%] mt-[0.1%] md:mt-[0.5%]"
              >
                {product.productSale && (
                  <div className="absolute top-0 right-0 z-[1]">
                    <img className="w-[7vw] md:w-[15vw]" src={saleFlag} alt="sale-tag" />
                    <p className="absolute top-[42%] right-[30%] text-[0.8vw] xl:text-[1vw] md:text-[2vw] uppercase font-[FahKwang]">
                      {product.productSale}%
                    </p>
                  </div>
                )}
                <Link to={`/single/product/${product.productLink}/${product.productSKU}`}>
                  <div className="min-h-[20rem] xl:min-h-[15rem] lg:min-h-[10rem]">
                    <img
                      src={`https://www.cosmo.global/laravel/api/storage/${product.media1}`}
                      alt={product.productName}
                      onError={(e) => (e.currentTarget.src = fallout)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {!product.totalQuantity && product.totalQuantity <= 0 && (
                  <div className="absolute top-0 left-0 w-full h-[90%] xl:h-[80%] bg-[#223574bd] bg-opacity-50 flex justify-center items-center">
                    <p className="text-[1.5vw] md:text-[4vw] text-white uppercase font-[FahKwang]">
                      {t("soldOut")}
                    </p>
                  </div>
                )}

                <div className="h-[75px] xl:h-[70px] md:h-[60px] py-[3%] text-[#082252]">
                  <p
                    className={`font-[100] uppercase ${
                      isArabic
                        ? "text-[18px] xl:text-[15px] md:text-[12px] text-right"
                        : "xl:text-[12px] sm:text-[10px]"
                    }`}
                  >
                    {product.productName}
                  </p>
                  {product.productSale ? (
                    <div className={`flex gap-[2%] flex-col w-full ${isArabic ? "text-right" : ""}`}>
                      <p className="font-[FrutigerLTCom-Roman] xl:text-[10px]">
                        {(
                          (product.productPrice -
                            product.productPrice * (product.productSale / 100)) *
                          currencyValue
                        ).toFixed(2)}{" "}
                        {currencyUsed}
                      </p>
                      <p className="text-[12px] xl:text-[10px] line-through text-[#a9a9a9]">
                        {(product.productPrice * currencyValue).toFixed(2)} {currencyUsed}
                      </p>
                    </div>
                  ) : (
                    <p className={`xl:text-[10px] font-[FrutigerLTCom-Roman] ${isArabic ? "text-right" : ""}`}>
                      {(product.productPrice * currencyValue).toFixed(2)} {currencyUsed}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-[2%] flex justify-center items-center">
            {moreItems && (
              <button
                onClick={handleLoadMore}
                className="w-[150px] p-[10px] rounded-sm md:py-[3%] md:w-[150px] md:text-[12px] text-center bg-[#082252] text-white font-bold uppercase hover:bg-[#2f4672]"
                disabled={showMoreLoading}
              >
                {showMoreLoading ? "Loading..." : "Show More"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="h-[80vh] flex justify-center items-center text-[#082252]">
          <img className="w-[120px] md:w-[100px] sm:w-[90px]" src={loader} alt="loader" />
        </div>
      )}
    </div>
  );
}

export default ProductsPerCategory;
