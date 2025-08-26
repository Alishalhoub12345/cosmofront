import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Navbar/cosmo-logo.gif";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { CartContext } from "../Cart/CartContext";
import Currency from "../Currency/Currency";
import { useTranslation } from "react-i18next";
import { VscAccount } from "react-icons/vsc";
import { BsCart3 } from "react-icons/bs";
import { GrSearch } from "react-icons/gr";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import TopBanner from "../siteMessage/TopBanner";
import AnnouncementBar from '../AnnouncementBar/AnnouncementBar'

/**
 * NOTE ON LAYERING:
 * --top-banner-h: CSS var to control banner height consistently
 * z-indexes:
 *  TopBanner wrapper: z-[60]
 *  Navbar wrapper:    z-[50]
 *  Mobile drawer:     z-[65]
 *  Search overlay:    z-[70]
 */

function Navbar() {
  const [hoveredDepartment, setHoveredDepartment] = useState(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const { cartLength } = useContext(CartContext);
  const [t, i18n] = useTranslation("global");
  const Logged = localStorage.getItem("firstName");
  const selectedLang = localStorage.getItem("lang");
  const isArabic = selectedLang === "ar";
  const [menuOpen, setMenuOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/search-products`,
        {
          params: { query: searchQuery, locale: selectedLang },
        }
      );
      setResults(response.data);
      setMessage("");
      setVisibleCount(8);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage(error.response.data.message);
      } else {
        console.error("Search error:", error);
      }
      setResults([]);
    }
  };

  const handleChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    } else {
      setResults([]);
      setMessage("");
      setVisibleCount(8);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim() && results.length > 0) {
      navigate(`/products?query=${encodeURIComponent(query)}`);
      handleSearchClose();
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = String(text).split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  const toggleMenu = () => setMenuOpen((v) => !v);

  const handleSearchClick = () => setOpenSearch(true);
  const handleSearchClose = () => {
    setOpenSearch(false);
    setResults([]);
    setQuery("");
    setMessage("");
  };

  const getDepartmentName = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/all-departments?visibleForAll=1",
      { params: { locale: selectedLang } }
    );
    return res.data.departments;
  };

  const { data: departments } = useQuery("allDepartments", getDepartmentName);

  const handleHover = (departmentId, categoryId = null) => {
    setHoveredDepartment(departmentId);
    setHoveredDropdown(departmentId);
    setHoveredCategory(categoryId);
  };
  const handleHoverLeave = () => {
    setHoveredDepartment(null);
    setHoveredDropdown(null);
    setHoveredCategory(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) i18n.changeLanguage(lang);
  }, [i18n]);

  return (
    <>
  <div className="w-full flex flex-col">
        <TopBanner />
        {/* <AnnouncementBar/> */}

      {/* SEARCH OVERLAY (highest layer) */}
      <div>
{openSearch && (
  <div
    className={`fixed inset-0 z-[1000] bg-[#242424e0] p-[5%] flex flex-col ${
      isArabic ? "text-right" : "items-end"
    }`}
    role="dialog"
    aria-modal="true"
  >
    <div className="h-[50px] cursor-pointer">
      <AiOutlineClose
        onClick={handleSearchClose}
        className="text-white text-[30px]"
      />
    </div>


          <input
            placeholder={t("search")}
            className={`w-full px-[2%] text-[18px] md:text-[15px] h-[40px] rounded-[5px] ${
              isArabic ? "text-right" : ""
            }`}
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <div className="mt-[10px] w-full md:p-[2%] bg-white text-[20px] md:text-[15px] rounded-[10px]">
            {message && <p className="text-black p-[1%]">{message}</p>}
            {results.length > 0 && (
              <ul className="text-black p-[1%] w-full">
                {results.slice(0, visibleCount).map((product) => (
                  <Link
                    to={`/products?query=${encodeURIComponent(
                      product.productName
                    )}`}
                    onClick={handleSearchClose}
                    key={product.id}
                  >
                    <li className="rounded-[2px] hover:bg-[#e3e0e0] py-[0.5%]">
                      {highlightMatch(product.productName, query)}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            <div className="w-full bg-[#676f98] hover:bg-[#2f4672] md:text-[12px] rounded-b flex justify-center items-center text-center">
              {results.length > visibleCount && (
                <Link
                  to={`/products?query=${encodeURIComponent(query)}`}
                  onClick={handleSearchClose}
                  className="text-white hover:text-[#ea9e7e] font-[FrutigerLTCom-Roman] w-full px-2 py-[0.5%] md:py-[2%]"
                >
                  View All Results
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

<div className="w-full z-[50] bg-white">
        {/* DESKTOP */}
        <div
          className={`h-[80px] xl:h-[70px] lg:h-[55px] flex flex-wrap text-[#082252] justify-center items-center lg:hidden border-[0.1px] border-gray-300 ${
            isArabic ? "flex-row-reverse" : ""
          } bg-white`}
        >
          <Link
            to="/"
            className="w-[20%] bg-[#082252] h-[100%] border flex justify-center items-center"
          >
            <img src={logo} alt="cosmo-logo" className="w-[100px] 2xl:w-[40%]" />
          </Link>

          {departments?.map((department) => (
            <div
              key={department.id}
              onMouseEnter={() => handleHover(department.id)}
              onMouseLeave={handleHoverLeave}
              className={`w-[12%] xl:text-[1.1vw] text-center flex justify-center items-center h-[100%] border hover:text-[#E79E7F] ${
                isArabic ? "text-[15px]" : ""
              }`}
            >
              <Link
                to={`/products/department/${department.departmentLink}`}
                className={`${isArabic ? "text-[15px]" : ""}`}
              >
                {department.departmentName}
              </Link>

              {(hoveredDepartment === department.id ||
                hoveredDropdown === department.id) &&
                department.categories && (
                  <div
                    onMouseEnter={() => handleHover(department.id)}
                    onMouseLeave={handleHoverLeave}
                    className="absolute top-[95px] xl:top-[70px] lg:top-[55px] w-[12%] h-[75vh] z-[55]"
                  >
                    <div className="border bg-white">
                      {department.depCollection === 1 ? (
                        <div className="flex flex-col">
                          {department?.collections
                            .filter((c) => c.visibleForAll === 1)
                            .map((collection, index) => (
                              <div key={collection.id} className="flex w-full p-[2%] flex-col">
                                {collection.products_count > 0 && (
                                  <Link
                                    onClick={toggleMenu}
                                    to={`/collection/${collection.collectionLink}`}
                                    className={`text-[15px] text-black p-[2%] ${
                                      isArabic
                                        ? "w-full text-[10px] px-[3%] text-right"
                                        : "w-full"
                                    } font-[FahKwang] ${
                                      index !== department.collections.length - 1
                                        ? "border-b text-center p-[3%] border-black"
                                        : ""
                                    }`}
                                  >
                                    {isArabic
                                      ? collection.collectionName_ar
                                      : collection.collectionName}
                                  </Link>
                                )}
                              </div>
                            ))}
                        </div>
                      ) : department.depSale === 1 ? (
                        <div className="flex flex-col">
                          {department?.sales
                            .filter((s) => s.saleVisible === 1)
                            .map((sale, index) => (
                              <div key={sale.id} className="flex w-full p-[2%] flex-col">
                                <Link
                                  onClick={toggleMenu}
                                  to={`/sale/products/${sale.saleLink}`}
                                  className={`text-[15px] text-black p-[2%] ${
                                    isArabic
                                      ? "w-full text-[10px] px-[3%] text-right"
                                      : "w-full"
                                  } font-[FahKwang] ${
                                    index !== department.sales.length - 1
                                      ? "border-b text-center p-[3%] border-black"
                                      : ""
                                  }`}
                                >
                                  {isArabic ? sale.sale_ar : sale.sale}
                                </Link>
                              </div>
                            ))}
                        </div>
                      ) : (
                        department?.categories
                          .filter((category) => category.visibility === 1)
                          .map((category, index) => (
                            <div
                              key={category.id}
                              className="flex justify-center items-center flex-col"
                              onMouseEnter={() =>
                                handleHover(department.id, category.id)
                              }
                            >
                              {category.products_count > 0 && (
                                <Link
                                  to={`/category/products/${category.categoryLink}`}
                                  className={`w-[90%] xl:w-full border-b flex justify-center items-center font-[FahKwang] hover:font-[900] bg-white h-[40px] lg:h-auto ${
                                    index !== department.categories.length - 1
                                      ? "border-b-black"
                                      : "border-b-0"
                                  } px-4 py-2 text-black ${
                                    hoveredCategory === category.id
                                      ? "font-bold"
                                      : ""
                                  }`}
                                >
                                  {category.categoryName}
                                </Link>
                              )}

                              {hoveredCategory === category.id &&
                                category.subcategories && (
                                  <div className="flex justify-center w-[90%] xl:w-full items-center flex-col px-[5%] border-b-black pb-[5%] border-b">
                                    {category.subcategories
                                      .filter((s) => s.visibility === 1)
                                      .map(
                                        (subcategory) =>
                                          subcategory.products_count > 0 && (
                                            <Link
                                              to={`/subcategory/products/${subcategory.subcategoryLink}`}
                                              key={subcategory.id}
                                              className="px-4 py-0 text-[#a6a6a6] font-[100] font-[FahKwang] hover:font-[900]"
                                            >
                                              {subcategory.subcategoryName}
                                            </Link>
                                          )
                                      )}
                                  </div>
                                )}
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                )}
            </div>
          ))}

          <div
            className={`w-[20%] lg:text-[12px] lg:flex-col-reverse flex justify-between px-[1%] xl:px-0 lg:justify-center lg:items-center h-[100%] border bg-[#656e9a] ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <div className="text-black flex items-center gap-6 px-[3%]">
              <div>
                {i18n.language === "en" && (
                  <button onClick={() => changeLanguage("ar")}>العربية</button>
                )}
                {i18n.language === "ar" && (
                  <button onClick={() => changeLanguage("en")}>English</button>
                )}
              </div>
              <div className="ml-[10%] xl:ml-[12%]">
                <Currency />
              </div>
            </div>

            <div
              className={`w-[55%] flex items-center justify-center gap-[5%] lg:justify-center lg:w-full ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <div>
                <GrSearch
                  className="lg:w-[15px] w-[18px] h-[18px] text-black cursor-pointer"
                  onClick={handleSearchClick}
                />
              </div>

              <div className="flex items-center">
                {Logged ? (
                  <Link
                    to="/account"
                    className={`text-black hover:text-[#f1b094] text-[12px] ${
                      isArabic ? "flex flex-row-reverse gap-[5%]" : ""
                    }`}
                  >
                    <span>{Logged}</span>
                  </Link>
                ) : (
                  <Link to="/login">
                    <VscAccount className="lg:w-[15px] w-[18px] h-[18px] text-black" />
                  </Link>
                )}
              </div>

              <div className="relative">
                <Link to="/cart" className="flex items-start text-white">
                  {cartLength > 0 && (
                    <p className="w-[12px] flex items-center absolute -top-[52%] lg:-top-[30%] left-[80%] justify-center h-[12px] rounded-full text-[8px] bg-[#d98865]">
                      {cartLength}
                    </p>
                  )}
                  <BsCart3 className="lg:w-[15px] w-[18px] h-[18px] text-black" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET */}
        <div className="h-[80px] overflow-auto lg:flex flex-wrap p-[2%] text-white justify-between items-center bg-[#082252] hidden">
          <div className="w-[25%] md:w-[35%]">
            <div className="flex items-center justify-evenly gap-[2%]">
              {menuOpen ? (
                <AiOutlineClose
                  onClick={toggleMenu}
                  className="w-[18px] h-[18px] z-[500] text-white"
                />
              ) : (
                <FaBarsStaggered
                  onClick={toggleMenu}
                  className="w-[18px] h-[18px] z-[500] text-white"
                />
              )}
              <div className="text-black flex items-center gap-[7%] xl:gap-[5%] px-[3%]">
                <div className="text-white text-[12px] w-[35px] flex">
                  {i18n.language === "en" && (
                    <button onClick={() => changeLanguage("ar")}>العربية</button>
                  )}
                  {i18n.language === "ar" && (
                    <button
                      className="text-[10px]"
                      onClick={() => changeLanguage("en")}
                    >
                      English
                    </button>
                  )}
                </div>
                <div className="text-white">
                  <Currency />
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="md:w-[20%] sm:w-[25%] lg:w-[15%] h-[100%] flex justify-center items-center"
          >
            <img src={logo} alt="cosmo-logo" />
          </Link>

          <div className="flex justify-evenly md:w-[35%] lg:w-[25%]">
            <div>
              <GrSearch className="w-[18px] h-[18px] cursor-pointer" onClick={handleSearchClick} />
            </div>
            <div className="flex items-center">
              {Logged ? (
                <Link to="/account" className="text-white hover:text-[#f1b094] text-[2vw] sm:text-[3vw]">
                  {Logged}
                </Link>
              ) : (
                <Link to="/login">
                  <VscAccount className="w-[18px] h-[18px]" />
                </Link>
              )}
            </div>
            <div className="flex items-center">
              <Link to="/cart" className="relative text-white">
                {cartLength > 0 && (
                  <p className="absolute -top-[50%] left-[80%] w-[12px] flex items-center justify-center h-[12px] rounded-full text-[8px] bg-[#d98865]">
                    {cartLength}
                  </p>
                )}
                <BsCart3 className="w-[18px] h-[18px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER (beneath search overlay but above navbar) */}
      <div
        className={`fixed inset-0 overflow-y-auto transform ${
          menuOpen ? "-translate-x-[32%]" : "-translate-x-[100%]"
        } transition-transform duration-300 ease-in-out z-[65]`}
      >
        <div className="bg-[#082252] hidden lg:flex pt-[30%] pl-[35%] flex-col min-h-full">
          {departments?.map((department) => (
            <div
              key={department.id}
              className={`z-[4] text-white text-[18px] pt-[2%] ${isArabic ? "text-right px-[2%]" : ""}`}
            >
              <div className={`flex justify-between items-center px-[1%] ${isArabic ? "flex-row-reverse" : ""}`}>
                <Link to={`/products/department/${department.departmentLink}`}>{department.departmentName}</Link>
                {hoveredDepartment === department.id || hoveredDropdown === department.id ? (
                  <IoIosArrowUp onClick={handleHoverLeave} className="w-[20px] h-[20px]" />
                ) : (
                  <IoIosArrowDown onClick={() => handleHover(department.id)} className="w-[20px] h-[20px]" />
                )}
              </div>
              <hr className="w-full pb-[2%]" />
              {(hoveredDepartment === department.id || hoveredDropdown === department.id) && (
                <>
                  {department.depCollection === 1 ? (
                    <div className="flex flex-col">
                      {department?.collections
                        .filter((c) => c.visibleForAll === 1)
                        .map((collection) => (
                          <div
                            key={collection.id}
                            className={`flex w-full px-[2%] flex-col ${
                              isArabic ? "items-end" : "items-start"
                            }`}
                          >
                            {collection.products_count > 0 && (
                              <Link
                                onClick={toggleMenu}
                                to={`/collection/${collection.collectionLink}`}
                                className="w-[90%] text-white border-b border-b-white font-[FahKwang] text-[15px] py-2"
                              >
                                {isArabic ? collection.collectionName_ar : collection.collectionName}
                              </Link>
                            )}
                          </div>
                        ))}
                    </div>
                  ) : department.depSale === 1 ? (
                    <div className="flex flex-col">
                      {department?.sales
                        .filter((s) => s.saleVisible === 1)
                        .map((sale) => (
                          <div
                            key={sale.id}
                            className={`flex w-full px-[2%] flex-col ${isArabic ? "items-end" : "items-start"}`}
                          >
                            <Link
                              onClick={toggleMenu}
                              to={`/sale/products/${sale.saleLink}`}
                              className="w-[90%] text-white border-b border-b-white font-[FahKwang] text-[15px] py-2"
                            >
                              {isArabic ? sale.sale_ar : sale.sale}
                            </Link>
                          </div>
                        ))}
                    </div>
                  ) : (
                    department.categories && (
                      <div>
                        {department.categories
                          .filter((category) => category.visibility === 1)
                          .map((category) => (
                            <div key={category.id} className="flex flex-col w-full px-[2%]">
                              <div className={`w-full flex justify-between items-center px-[1%] ${isArabic ? "flex-row-reverse" : ""}`}>
                                <Link
                                  to={`/category/products/${category.categoryLink}`}
                                  className={`w-[70%] text-white border-b border-b-white font-[FahKwang] text-[15px] py-2 ${
                                    hoveredCategory === category.id ? "font-bold" : ""
                                  }`}
                                >
                                  {category.categoryName}
                                </Link>
                                {hoveredCategory === category.id ? (
                                  <IoIosArrowUp onClick={handleHoverLeave} className="w-[20px] h-[20px]" />
                                ) : (
                                  <IoIosArrowDown
                                    onClick={() => handleHover(department.id, category.id)}
                                    className="w-[20px] h-[20px]"
                                  />
                                )}
                              </div>
                              {hoveredCategory === category.id && category.subcategories && (
                                <div
                                  className={`flex p-[1%] text-[15px] flex-col border-b border-b-white pb-[5%] ${
                                    isArabic ? "text-right px-[2%] w-full" : "w-[90%] xl:w-full"
                                  }`}
                                >
                                  {category.subcategories
                                    .filter((s) => s.visibility === 1)
                                    .map(
                                      (subcategory) =>
                                        subcategory.products_count > 0 && (
                                          <Link
                                            to={`/subcategory/products/${subcategory.subcategoryLink}`}
                                            onClick={toggleMenu}
                                            key={subcategory.id}
                                            className={`py-[1%] text-[#cfcfcf] font-[100] hover:font-bold font-[FahKwang] ${
                                              isArabic ? "text-right px-[2%] w-full" : ""
                                            }`}
                                          >
                                            {subcategory.subcategoryName}
                                          </Link>
                                        )
                                    )}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default Navbar;
