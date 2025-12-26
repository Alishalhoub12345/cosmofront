import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

const getUserLocation = async () => {
  try {
    const response = await axios.get("https://www.cosmo.global/laravel/api/location");
    const data = response.data;
    localStorage.setItem("location", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Location fetch error:", error);
    return null;
  }
};

const fetchCurrencies = async () => {
  try {
    const response = await axios.get(
      "https://www.cosmo.global/laravel/api/exchange-rates/USD"
    );
    return response.data;
  } catch {
    return [];
  }
};

export default function Currency() {
  const btnRef = useRef(null);
  const { t } = useTranslation("global");

  // ✔️ Use SAME Arabic detection method as Banner.jsx
  const isArabic = localStorage.getItem("lang") === "ar";

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isOpen, setIsOpen] = useState(false);

  const { data: currencies = [], isLoading } = useQuery(
    "currencies",
    fetchCurrencies,
    { staleTime: 300000, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    const loadCurrency = async () => {
      let saved = localStorage.getItem("currencyUsed");

      if (!saved) {
        const location = await getUserLocation();
        const userCurrency = location?.currency?.code || "USD";

        const allowed = [
          "USD",
          "AED",
          "EGP",
          "BHD",
          "IQD",
          "SAR",
          "QAR",
          "KWD",
          "JOD",
        ];

        saved = allowed.includes(userCurrency) ? userCurrency : "USD";
        localStorage.setItem("currencyUsed", saved);
      }

      setSelectedCurrency(saved);
    };

    loadCurrency();
  }, []);

  const handleChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem("currencyUsed", currency);
    setIsOpen(false);
    window.location.reload();
    
  };

  const rect = btnRef.current?.getBoundingClientRect();
  const left = rect
    ? Math.max(8, Math.min(window.innerWidth - 176 - 8, rect.left))
    : 8;
  const top = rect ? rect.bottom + 8 : 56;

  const menu =
    isOpen && rect
      ? createPortal(
          <>
            <div
              className="fixed inset-0 z-[99998]"
              onClick={() => setIsOpen(false)}
            />

            <div
              style={{ top, left }}
              className="fixed z-[99999] bg-white border border-gray-300 rounded-md shadow-lg min-w-[150px]"
            >
              {isLoading && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  Loading...
                </div>
              )}

              {!isLoading &&
                currencies.map((c) => {
                  const translated =
                    t(`currencies.${c.currency}`) !== `currencies.${c.currency}`
                      ? t(`currencies.${c.currency}`)
                      : c.currency;

                  return (
                    <button
                      key={c.currency}
                      onClick={() => handleChange(c.currency)}
                      className={`block w-full px-4 py-2 text-sm text-left ${
                        c.currency === selectedCurrency
                          ? "font-semibold text-[#082252]"
                          : "text-gray-700"
                      }`}
                    >
                      {isArabic
                        ? `${translated}`
                        : `${c.currency}`}
                    </button>
                  );
                })}
            </div>
          </>,
          document.body
        )
      : null;

  const selectedTranslated =
    t(`currencies.${selectedCurrency}`) !==
    `currencies.${selectedCurrency}`
      ? t(`currencies.${selectedCurrency}`)
      : selectedCurrency;

  return (
    <div className="inline-block text-left">
      <button
        ref={btnRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="sm:text-[#082252] text-[#082252] text-sm font-medium cursor-pointer"
      >
        {isArabic
          ? `${selectedTranslated}`
          : `${selectedTranslated}`}
      </button>

      {menu}
    </div>
  );
}
