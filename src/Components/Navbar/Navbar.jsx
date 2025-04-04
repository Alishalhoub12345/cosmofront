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

function Navbar() {
  const [hoveredDepartment, setHoveredDepartment] = useState(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const { cartLength } = useContext(CartContext);
  const [t, i18n] = useTranslation("global");
  const Logged = localStorage.getItem("firstName");
  const selectedLang = localStorage.getItem("lang");
  const isArabic = localStorage.getItem("lang") === "ar";
  const [menuOpen, setMenuOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/search-products`,
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
      setVisibleCount(8); // Reset visible count on empty query
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim() && results.length > 0) {
      navigate(`/products?query=${query}`);
      handleSearchClose();
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchClick = () => {
    setOpenSearch(true);
  };
  const handleSearchClose = () => {
    setOpenSearch(false);
    setResults([]);
    setQuery("");
    setMessage("");
  };

  const getDepartmentName = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/all-departments?visibleForAll=1",
        {
          params: { locale: selectedLang },
        }
      );
      return res.data.departments;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const { data: departments } = useQuery("allDepartments", getDepartmentName);

  // const handleDepartmentHover = (departmentId) => {
  //   setHoveredDepartment(departmentId);
  // };

  // const handleDropdownHover = (departmentId) => {
  //   setHoveredDropdown(departmentId);
  // };

  // const handleHoverLeave = () => {
  //   setHoveredDepartment(null);
  //   setHoveredDropdown(null);
  //   setHoveredCategory(null);
  // };

  // const handleCategoryHover = (categoryId, departmentId) => {
  //   setHoveredCategory(categoryId);
  //   setHoveredDropdown(departmentId);
  // };


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
    const selectedLang = localStorage.getItem("lang");
    if (selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [i18n]);

  return (
    <div>
      {openSearch && (
        <div
          className={`h-[100%] fixed z-[500] bg-[#242424e0] w-[100%] p-[5%] flex  flex-col ${
            isArabic ? "text-right" : "items-end"
          }`}
        >
          <div className="h-[50px] cursor-pointer">
            <AiOutlineClose
              onClick={handleSearchClose}
              className="text-[white] text-[30px]"
            />
          </div>
          <input
            placeholder={t("search")}
            className={`w-[100%] px-[2%] text-[18px] md:text-[15px] h-[40px] rounded-[5px] ${
              isArabic ? "text-right" : ""
            }`}
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyPress} // Handle key down for Enter key
          />
          <div className="mt-[10px] w-[100%] md:p-[2%]  bg-white text-[20px] md:text-[15px] rounded-[10px] ">
            {message && (
              <p className="text-[black] h-[auto] p-[1%]">{message}</p>
            )}
            {results.length > 0 && (
              <ul className="text-[black] h-[auto] p-[1%] w-[100%]">
                {results.slice(0, visibleCount).map((product) => (
                  <Link
                    to={`/products?query=${product.productName}`}
                    onClick={handleSearchClose}
                    key={product.id}
                  >
                    <li className=" rounded-[2px] hover:bg-[#e3e0e0] py-[0.5%]">
                      {highlightMatch(product.productName, query, selectedLang)}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            <div className=" w-[100%]  bg-[#676f98] hover:bg-[#2f4672] md:text-[12px] rounded-b flex justify-center items-center text-center">
              {results.length > visibleCount && (
                <Link
                  to={`/products?query=${query}`}
                  onClick={handleSearchClose}
                  className="text-[white] hover:text-[#ea9e7e] font-[FrutigerLTCom-Roman] w-[100%]  px-2 py-[0.5%] md:py-[2%]"
                >
                  View All Results
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <div className=" sticky top-0 z-50 w-[100%] ">
        <div
          className={`h-[80px] xl:h-[70px] lg:h-[55px] flex flex-wrap text-[#082252] justify-center items-center lg:hidden ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <Link
            to="/"
            className="w-[20%] bg-[#082252] h-[100%] border-[1px] flex justify-center items-center"
          >
            <img
              src={logo}
              alt="cosmo-logo"
              className="w-[100px] 2xl:w-[40%]"
            />
          </Link>

          {departments?.map((department) => (
            <div
              key={department.id}
              onMouseEnter={() => handleHover(department.id)}
              onMouseLeave={handleHoverLeave}
              className={`w-[12%] xl:text-[1.1vw] text-center flex justify-center items-center h-[100%] border-[1px] hover:text-[#E79E7F] ${
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
                    className="absolute top-[80px] xl:top-[65px] lg:top-[49px] w-[12%] h-[75vh] z-[2]"
                  >
                    <div className="border-black bg-white border-[1px]">
                      {department.depCollection === 1 ? (
                        <div className="flex flex-col justify-center items-center">
                          {department?.collections
                            .filter(
                              (collection) => collection.visibleForAll === 1
                            )
                            .map((collection, index) => (
                              <div
                                key={collection.id}
                                className="flex w-[100%] p-[2%] justify-start items-start flex-col"
                              >
                                {collection.products_count > 0 && (
                                  <Link
                                    onClick={toggleMenu}
                                    to={`/collection/${collection.collectionLink}`}
                                    className={`text-[15px] text-black p-[2%] ${
                                      isArabic
                                        ? "w-[100%] text-[10px] px-[3%] text-right"
                                        : "w-[100%] xl:w-[100%]"
                                    } font-[FahKwang] ${
                                      index !==
                                      department.collections.length - 1
                                        ? "border-b-[1px] text-center p-[3%] border-[black]"
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
                        <div className="flex flex-col justify-center items-center">
                          {department?.sales
                            .filter((sale) => sale.saleVisible === 1)
                            .map((sale, index) => (
                              <div
                                key={sale.id}
                                className="flex w-[100%] p-[2%] justify-start items-start flex-col"
                              >
                                <Link
                                  onClick={toggleMenu}
                                  to={`/sale/products/${sale.saleLink}`}
                                  className={`text-[15px] text-black p-[2%] ${
                                    isArabic
                                      ? "w-[100%] text-[10px] px-[3%] text-right"
                                      : "w-[100%] xl:w-[100%]"
                                  } font-[FahKwang] ${
                                    index !== department.sales.length - 1
                                      ? "border-b-[1px] text-center p-[3%] border-[black]"
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
                                  className={`w-[90%] xl:w-[100%] border-b-[1px] flex justify-center items-center font-[FahKwang] hover:font-[900] bg-white h-[40px] lg:h-[auto] border-b-${
                                    index !== department.categories.length - 1
                                      ? "[black]"
                                      : "none"
                                  } px-4 py-2 text-black ${
                                    hoveredCategory === category.id
                                      ? "font-bold border-b-[white]"
                                      : ""
                                  }`}
                                >
                                  {category.categoryName}
                                </Link>
                              )}

                              {hoveredCategory === category.id &&
                                category.subcategories && (
                                  <div className="flex justify-center w-[90%] xl:w-[100%] h-[fit-content] items-center flex-col px-[5%] border-b-[black] pb-[5%] border-b-[1px]">
                                    {category.subcategories
                                      .filter(
                                        (subcategory) =>
                                          subcategory.visibility === 1
                                      )
                                      .map(
                                        (subcategory) =>
                                          subcategory.products_count > 0 && (
                                            <Link
                                              to={`/subcategory/products/${subcategory.subcategoryLink}`}
                                              key={subcategory.id}
                                              className="px-4 py-[0] text-[#a6a6a6] font-[100] font-[FahKwang] hover:font-[900]"
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
            className={`w-[20%] lg:text-[12px] lg:flex-col-reverse flex justify-between px-[1%] xl:px-[0%] lg:justify-center lg:items-center h-[100%] border-[1px]  border-b-[1px] bg-[#656e9a] ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <div className=" text-black flex items-center gap-[7%] xl:gap-[5%] px-[3%]">
              <div>
                {i18n.language === "en" && (
                  <button onClick={() => changeLanguage("ar")}>العربية</button>
                )}
                {i18n.language === "ar" && (
                  <button onClick={() => changeLanguage("en")}>English</button>
                )}
              </div>
              <Currency />
            </div>
            <div
              className={`w-[55%] flex  items-center justify-center gap-[5%] lg:justify-center lg:w-[100%] ${
                isArabic ? " flex-row-reverse" : ""
              }`}
            >
              <div>
                <GrSearch
                  className="lg:w-[15px] w-[18px] h-[18px] text-black cursor-pointer"
                  onClick={() => handleSearchClick()}
                />
              </div>

              <div className="flex justify-center items-center ">
                {Logged ? (
                  <Link
                    to="/account"
                    className={`text-black hover:text-[#f1b094] text-[12px] xl:tw   ${
                      isArabic ? " flex flex-row-reverse gap-[5%]" : ""
                    }`}
                  >
                    <span>{Logged}</span>
                  </Link>
                ) : (
                  <Link to="/login" className="">
                    {" "}
                    <VscAccount className="lg:w-[15px] w-[18px] h-[18px] text-black" />
                  </Link>
                )}
              </div>
              <div className="relative  ">
                <Link
                  to="/cart"
                  className="flex justify-end items-start text-white  "
                >
                  {cartLength === 0 ? (
                    <p></p>
                  ) : (
                    <p className=" w-[12px] text-[center] flex items-center absolute top-[-52%] lg:top-[-30%]  left-[80%] justify-center h-[12px] rounded-[100px] text-[8px] bg-[#d98865]">
                      {cartLength}
                    </p>
                  )}
                  <BsCart3 className="lg:w-[15px] w-[18px] h-[18px] text-black" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Responsive section */}
        <div className="h-[80px] overflow-auto lg:flex flex-wrap p-[2%] text-white justify-between items-center bg-[#082252] hidden">
          <div className=" w-[25%] md:w-[35%] ">
            <div className="flex items-center justify-evenly gap-[2%] ">
              {menuOpen ? (
                <AiOutlineClose
                  onClick={toggleMenu}
                  className=" w-[18px] h-[18px] z-[500] text-white "
                />
              ) : (
                <FaBarsStaggered
                  onClick={toggleMenu}
                  className=" w-[18px] h-[18px] z-[500] text-white "
                />
              )}
              <div className=" text-black flex items-center gap-[7%] xl:gap-[5%] px-[3%]">
                <div className="text-white text-[12px] w-[35px] flex ">
                  {i18n.language === "en" && (
                    <button onClick={() => changeLanguage("ar")}>
                      العربية
                    </button>
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
                <div className=" text-white">
                  <Currency />
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="md:w-[20%] sm:w-[25%] lg:w-[15%] h-[100%] flex justify-center items-center "
          >
            <img src={logo} alt="cosmo-logo" className="  "></img>
          </Link>

          <div className="flex justify-evenly md:w-[35%] lg:w-[25%]  ">
            <div>
              <GrSearch
                className="w-[18px] h-[18px] cursor-pointer"
                onClick={() => handleSearchClick()}
              />
            </div>
            <div className="flex justify-center items-center ">
              {Logged ? (
                <Link
                  to="/account"
                  className="text-white hover:text-[#f1b094] text-[2vw] sm:text-[3vw]"
                >
                  {Logged}
                </Link>
              ) : (
                <Link to="/login" className="">
                  <VscAccount className="w-[18px] h-[18px]" />
                </Link>
              )}
            </div>
            <div className=" flex justify-center items-center  ">
              <Link to="/cart" className=" w-[100%] relative  text-white  ">
                {cartLength === 0 ? (
                  <p></p>
                ) : (
                  <p className="  absolute top-[-50%] left-[80%] w-[12px] text-[center] flex items-center justify-center h-[12px] rounded-[100px] text-[8px] bg-[#d98865]">
                    {cartLength}
                  </p>
                )}

                <BsCart3 className="w-[18px] h-[18px]" />
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`fixed overflow-y-auto inset-0 transform ${
            menuOpen ? "-translate-x-[32%] " : "-translate-x-[100%]"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="bg-[#082252] hidden lg:flex pt-[30%] pl-[35%] flex-col min-h-full">
            {departments &&
              departments.map((department) => (
                <div
                  key={department.id}
                  className={`z-[4] text-white text-[18px] pt-[2%] ${
                    isArabic ? "text-right px-[2%]" : ""
                  }`}
                >
                  <div
                    className={`flex justify-between items-center px-[1%] ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Link
                      to={`/products/department/${department.departmentLink}`}
                    >
                      {department.departmentName}
                    </Link>
                    {hoveredDepartment === department.id ||
                    hoveredDropdown === department.id ? (
                      <IoIosArrowUp
                        onClick={handleHoverLeave}
                        className="w-[20px] h-[20px]"
                      />
                    ) : (
                      <IoIosArrowDown
                        onClick={() => handleHover(department.id)}
                        className="w-[20px] h-[20px]"
                      />
                    )}
                  </div>
                  <hr className="w-[100%] pb-[2%]" />
                  {(hoveredDepartment === department.id ||
                    hoveredDropdown === department.id) && (
                    <>
                      {department.depCollection === 1 ? (
                        <div className="flex flex-col justify-center items-center">
                          {department?.collections
                            .filter(
                              (collection) => collection.visibleForAll === 1
                            )
                            .map((collection) => (
                              <div
                                key={collection.id}
                                className={`flex w-[100%] px-[2%] flex-col ${
                                  isArabic
                                    ? "justify-end  items-end"
                                    : "justify-start  items-start "
                                }`}
                              >
                                {collection.products_count > 0 && (
                                  <Link
                                    onClick={toggleMenu}
                                    to={`/collection/${collection.collectionLink}`}
                                    className="w-[90%] text-white border-b-[1px] border-b-[white] font-[FahKwang] text-[15px] py-2"
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
                        <div className="flex flex-col justify-center items-center">
                          {department?.sales
                            .filter((sale) => sale.saleVisible === 1)
                            .map((sale) => (
                              <div
                                key={sale.id}
                                className={`flex w-[100%] px-[2%] flex-col ${
                                  isArabic
                                    ? "justify-end  items-end"
                                    : "justify-start  items-start "
                                }`}
                              >
                                <Link
                                  onClick={toggleMenu}
                                  to={`/sale/products/${sale.saleLink}`}
                                  className="w-[90%] text-white border-b-[1px] border-b-[white] font-[FahKwang] text-[15px] py-2"
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
                                <div
                                  key={category.id}
                                  className="flex justify-start items-start flex-col w-[100%] px-[2%]"
                                >
                                  <div
                                    className={`w-[100%] flex justify-between items-center px-[1%] ${
                                      isArabic ? "flex-row-reverse" : ""
                                    }`}
                                  >
                                    <Link
                                      to={`/category/products/${category.categoryLink}`}
                                      className={`w-[70%] text-white border-b-[1px] border-b-[white] font-[FahKwang] text-[15px] py-2 ${
                                        hoveredCategory === category.id
                                          ? "font-bold border-b-[#131e32]"
                                          : ""
                                      }`}
                                    >
                                      {category.categoryName}
                                    </Link>
                                    {hoveredCategory === category.id ? (
                                      <IoIosArrowUp
                                        onClick={handleHoverLeave}
                                        className="w-[20px] h-[20px]"
                                      />
                                    ) : (
                                      <IoIosArrowDown
                                        onClick={() =>
                                          handleHover(
                                            department.id,
                                            category.id
                                          )
                                        }
                                        className="w-[20px] h-[20px]"
                                      />
                                    )}
                                  </div>
                                  {hoveredCategory === category.id &&
                                    category.subcategories && (
                                      <div
                                        className={`flex  p-[1%] h-[fit-content] text-[15px] items-start flex-col border-b-[white] pb-[5%] border-b-[1px] ${
                                          isArabic
                                            ? "w-[100%] text-right px-[2%]"
                                            : "justify-start w-[90%] xl:w-[100%]"
                                        }`}
                                      >
                                        {category.subcategories
                                          .filter(
                                            (subcategory) =>
                                              subcategory.visibility === 1
                                          )
                                          .map(
                                            (subcategory) =>
                                              subcategory.products_count >
                                                0 && (
                                                <Link
                                                  to={`/subcategory/products/${subcategory.subcategoryLink}`}
                                                  onClick={toggleMenu}
                                                  key={subcategory.id}
                                                  className={`py-[1%] text-[#cfcfcf] font-[100] hover:font-bold font-[FahKwang] ${
                                                    isArabic
                                                      ? "text-right px-[2%] w-[100%]"
                                                      : ""
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
  );
}

export default Navbar;
