import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import { useTranslation } from "react-i18next";

import logo from "../../images/Navbar/Gemini_Generated_Image_1paacp1paacp1paa-removebg-preview.png";

import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { BsCart3 } from "react-icons/bs";
import { GrSearch } from "react-icons/gr";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import Currency from "../Currency/Currency";
import TopBanner from "../siteMessage/TopBanner";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [subDropdown, setSubDropdown] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const { cartLength } = useContext(CartContext);
  const navigate = useNavigate();
  const Logged = localStorage.getItem("firstName");

  const [t, i18n] = useTranslation("global");
  const lang = localStorage.getItem("lang") || "en";
  const isArabic = lang === "ar";

  /* ---------------------- GET DEPARTMENTS ---------------------- */
  const fetchDepartments = async () => {
    const res = await axios.get(
      "https://www.cosmo.global/laravel/api/all-departments?visibleForAll=1",
      { params: { locale: lang } }
    );
    return res.data.departments;
  };

  const { data: departments } = useQuery("allDepartments", fetchDepartments);

  /* ---------------------- SEARCH ---------------------- */
  const handleSearch = async (val) => {
    try {
      const res = await axios.get("https://www.cosmo.global/laravel/api/search-products", {
        params: { query: val, locale: lang },
      });

      setResults(res.data);
      setMessage("");
    } catch (err) {
      if (err.response?.status === 404) setMessage(err.response.data.message);
      else console.error(err);
      setResults([]);
    }
  };

  const closeSearch = () => {
    setOpenSearch(false);
    setQuery("");
    setResults([]);
    setMessage("");
  };

  /* ---------------------- LANGUAGE ---------------------- */
  const switchLang = () => {
    const newLang = isArabic ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    window.location.reload();
  };

  /* ---------------------- MOBILE CLICK HANDLERS ---------------------- */
  const handleDeptClickMobile = (dep) => {
    if (dropdown === dep.id) {
      navigate(`/products/department/${dep.departmentLink}`);
      closeMenuAndNavigate();
    } else {
      setDropdown(dep.id);
      setSubDropdown(null);
    }
  };

  const handleCatClickMobile = (cat) => {
    if (subDropdown === cat.id) {
      navigate(`/category/products/${cat.categoryLink}`);
      closeMenuAndNavigate();
    } else {
      setSubDropdown(cat.id);
    }
  };

  const closeMenuAndNavigate = () => {
    setMenuOpen(false);
    setDropdown(null);
    setSubDropdown(null);
  };
const BurgerIcon = ({ className, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className={`${className} cursor-pointer`}
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);



  return (
    <>
      <TopBanner />

      {/* ---------------------- SEARCH OVERLAY ---------------------- */}
      {openSearch && (
        <div className="fixed inset-0 z-[1000] bg-[#242424e0] p-5 flex flex-col">
          <AiOutlineClose
            className="text-white text-3xl cursor-pointer self-end"
            onClick={closeSearch}
          />

<div className="relative w-full mt-4">
  <input
    value={query}
    onChange={(e) => {
      setQuery(e.target.value);
      if (e.target.value.trim()) handleSearch(e.target.value);
      else {
        setResults([]);
        setMessage("");
      }
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        navigate(`/products?query=${encodeURIComponent(query)}`);
        closeSearch();
      }
    }}
    placeholder={t("search")}
    className={`w-full px-4 py-2 pr-12 rounded text-lg focus:outline-none ${
      isArabic ? "text-right pl-12 pr-4" : ""
    }`}
  />

  {/* 🔍 MAGNIFIER = MOBILE ENTER */}
  <button
    type="button"
    onClick={() => {
      if (!query.trim()) return;
      navigate(`/products?query=${encodeURIComponent(query)}`);
      closeSearch();
    }}
    className={`absolute top-1/2 -translate-y-1/2 text-xl text-gray-600
      ${isArabic ? "left-4" : "right-4"}
    `}
  >
    <GrSearch />
  </button>
</div>


          <div className="mt-4 bg-white rounded max-h-[60vh] overflow-auto p-3 text-[#082252]">
            {message && <p>{message}</p>}

            {results.length > 0 &&
              results.slice(0, 8).map((item) => (
                <Link
                  key={item.id}
                  to={`/products?query=${encodeURIComponent(item.productName)}`}
                  onClick={closeSearch}
                >
                  <div className="py-2 hover:bg-gray-200 rounded">
                    {item.productName}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* ---------------------- MOBILE NAVBAR (≤1350px) ---------------------- */}
      <div className="hidden xl:flex h-[70px] bg-[#f0f0f0ab] text-[#082252] items-center justify-between px-4 shadow">
        {/* Left icons */}
        <div className="flex items-center gap-3 text-[#082252]">
          {menuOpen ? (
            <AiOutlineClose className="text-2xl" onClick={() => setMenuOpen(false)} />
          ) : (
            <div className="w-6 h-6 flex items-center justify-center text-[#082252]">
<BurgerIcon
  className="w-6 h-6 text-[#082252]"
  onClick={() => setMenuOpen(true)}
/>
              </div>
          )}

          <button onClick={switchLang}>{isArabic ? "EN" : "AR"}</button>

          <Currency />
        </div>

        {/* Logo */}
        <Link to="/" className="flex justify-center">
          <img src={logo} className="w-[45%]" alt="logo" />
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          <GrSearch className="text-xl" onClick={() => setOpenSearch(true)} />

          {Logged ? (
            <Link to="/account">{Logged}</Link>
          ) : (
            <Link to="/login">
              <VscAccount className="text-xl" />
            </Link>
          )}

          <Link to="/cart" className="relative">
            {cartLength > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#082252] text-white text-[10px] flex justify-center items-center rounded-full">
                {cartLength}
              </span>
            )}
            <BsCart3 className="text-xl" />
          </Link>
        </div>
      </div>

      {/* ---------------------- MOBILE DROPDOWN MENU ---------------------- */}
      {menuOpen && (
        <div className="text-[#082252] hidden xl:flex flex-col bg-white shadow max-h-[70vh] overflow-y-auto border-t">
          {departments?.map((dep) => (
            <div key={dep.id} className="border-b">
              {/* CLICKABLE + DROPDOWN */}
              <div
                className="w-full flex justify-between items-center px-4 py-3 cursor-pointer"
                onClick={() => handleDeptClickMobile(dep)}
              >
                <span>{dep.departmentName}</span>
                {dropdown === dep.id ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>

              {dropdown === dep.id && (
                <div className="bg-[#f9f9f9]">
                  {/* Collections */}
                  {dep.depCollection === 1 &&
                    dep.collections
                      ?.filter((c) => c.visibleForAll === 1)
                      .map((c) => (
                        <Link
                          key={c.id}
                          to={`/collection/${c.collectionLink}`}
                          className="block px-6 py-2 text-sm hover:bg-[#ececec]"
                          onClick={closeMenuAndNavigate}
                        >
                          {isArabic ? c.collectionName_ar : c.collectionName}
                        </Link>
                      ))}

                  {/* Sales */}
                  {dep.depSale === 1 &&
                    dep.sales
                      ?.filter((s) => s.saleVisible === 1)
                      .map((s) => (
                        <Link
                          key={s.id}
                          to={`/sale/products/${s.saleLink}`}
                          className="block px-6 py-2 text-sm hover:bg-[#ececec]"
                          onClick={closeMenuAndNavigate}
                        >
                          {isArabic ? s.sale_ar : s.sale}
                        </Link>
                      ))}

                  {/* Categories */}
                  {dep.categories &&
                    dep.categories
                      .filter((cat) => cat.visibility === 1)
                      .map((cat) => (
                        <div key={cat.id} className="border-t">
                          <div
                            className="w-full flex justify-between items-center px-6 py-2 text-sm font-semibold cursor-pointer hover:bg-[#e5e5e5]"
                            onClick={() => handleCatClickMobile(cat)}
                          >
                            <span>{cat.categoryName}</span>
                            {subDropdown === cat.id ? (
                              <IoIosArrowUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </div>

                          {/* Subcategories */}
                          {subDropdown === cat.id && (
                            <div className="bg-white">
                              {cat.subcategories
                                ?.filter((s) => s.visibility === 1)
                                .map((sub) => (
                                  <Link
                                    key={sub.id}
                                    to={`/subcategory/products/${sub.subcategoryLink}`}
                                    className="block px-8 py-2 text-xs hover:bg-[#f0f0f0]"
                                    onClick={closeMenuAndNavigate}
                                  >
                                    {sub.subcategoryName}
                                  </Link>
                                ))}
                            </div>
                          )}
                        </div>
                      ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---------------------- DESKTOP NAVBAR ---------------------- */}
      <div className="flex xl:hidden justify-between items-center bg-[#f0f0f0ab] h-[80px] shadow relative border-b-2 border-[#082252]">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center h-full w-[22%]">
          <img src={logo} alt="logo" className="w-[30%]" />
        </Link>

        {/* Departments */}
<div
  className={`flex flex-nowrap ${isArabic ? "flex-row-reverse" : ""} 
  text-[#082252] h-full text-[clamp(10px,0.9vw,16px)]`}
>
          {departments?.map((dep) => (
            <div
              key={dep.id}
              onMouseEnter={() => setDropdown(dep.id)}
              onMouseLeave={() => {
                setDropdown(null);
                setSubDropdown(null);
              }}
className="relative flex-1 min-w-0 h-full flex justify-center items-center border-r bg-[#f0f0f0ab] text-center"
            >
              {/* CLICKABLE DEPARTMENT */}
              <Link
                to={`/products/department/${dep.departmentLink}`}
className="hover:font-bold font-[FahKwang] whitespace-nowrap truncate px-2 w-[200px]"
              >
                {dep.departmentName}
              </Link>

              {/* Hover Drawer */}
              {dropdown === dep.id && (
                <div className="absolute top-[100%] left-0 w-full bg-[#f6f5f5] shadow-md z-[60]">
                  <div className="flex flex-col">

                    {/* Collections */}
                    {dep.depCollection === 1 &&
                      dep.collections
                        ?.filter((c) => c.visibleForAll === 1)
                        .map((c) => (
                          <Link
                            key={c.id}
                            to={`/collection/${c.collectionLink}`}
                            className="py-2 text-center hover:bg-[#e9e9e9] font-[FahKwang]"
                          >
                            {isArabic ? c.collectionName_ar : c.collectionName}
                          </Link>
                        ))}

                    {/* Sales */}
                    {dep.depSale === 1 &&
                      dep.sales
                        ?.filter((s) => s.saleVisible === 1)
                        .map((s) => (
                          <Link
                            key={s.id}
                            to={`/sale/products/${s.saleLink}`}
                            className="py-2 text-center hover:bg-[#e9e9e9] font-[FahKwang]"
                          >
                            {isArabic ? s.sale_ar : s.sale}
                          </Link>
                        ))}

                    {/* Categories — NOW CLICKABLE */}
                    {dep.categories &&
                      dep.categories
                        .filter((cat) => cat.visibility === 1)
                        .map((cat) => (
                          <div key={cat.id} className="w-full relative group">
                            <Link
                              to={`/category/products/${cat.categoryLink}`}
                              className="block py-2 text-center hover:bg-[#e5e5e5] font-[FahKwang]"
                              onMouseEnter={() => setSubDropdown(cat.id)}
                            >
                              {cat.categoryName}
                            </Link>

                            {/* Subcategories */}
                            {subDropdown === cat.id && (
                              <div className="flex flex-col top-0 left-full bg-white shadow-md text-center w-full">
                                {cat.subcategories
                                  ?.filter((s) => s.visibility === 1)
                                  .map((sub) => (
                                    <Link
                                      key={sub.id}
                                      to={`/subcategory/products/${sub.subcategoryLink}`}
                                      className="block py-1 hover:font-bold text-[#082252] font-[FahKwang]"
                                    >
                                      {sub.subcategoryName}
                                    </Link>
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center pr-8 gap-9 text-[#082252]">
          <div className="flex items-center gap-5">
            <button onClick={switchLang}>{isArabic ? "English" : "العربية"}</button>
            <Currency />
          </div>

          <div className="flex items-center gap-5">
            <GrSearch className="cursor-pointer" onClick={() => setOpenSearch(true)} />
            {Logged ? (
              <Link to="/account">{Logged}</Link>
            ) : (
              <Link to="/login">
                <VscAccount className="text-xl" />
              </Link>
            )}
            <Link to="/cart" className="relative">
              {cartLength > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#082252] text-white w-4 h-4 text-[10px] rounded-full flex justify-center items-center">
                  {cartLength}
                </span>
              )}
              <BsCart3 className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
