import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

// Fetch available currencies and rates from backend
const fetchCurrencies = async () => {
  try {
    const response = await axios.get("https://www.cosmo.global/laravel/api/exchange-rates/USD");
    return response.data; // [{ currency: "USD", rate: 1 }, ...]
  } catch (err) {
    console.error("Failed to fetch currencies:", err.message);
    return [
      { currency: "USD", rate: 1 },
      { currency: "EUR", rate: 0.91 },
      { currency: "IQD", rate: 1300 },
      { currency: "EGP", rate: 49 },
      { currency: "AED", rate: 3.67 },
      { currency: "SAR", rate: 3.75 },
      { currency: "KWD", rate: 0.31 },
      { currency: "BHD", rate: 0.38 },
    ]; 
  }
};

const Currency = () => {
  const dropdownRef = useRef(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isOpen, setIsOpen] = useState(false);

  const { data: currencies, error, isLoading } = useQuery("currencies", fetchCurrencies, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Load saved currency on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currencyUsed") || "USD";
    setSelectedCurrency(savedCurrency);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = async (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem("currencyUsed", currency);
    setIsOpen(false);

    // Optional: force page refresh to update prices based on currency
    window.location.reload();
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className=" text-black text-sm font-medium cursor-pointer"
      >
        {selectedCurrency}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-[9999]">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="px-4 py-2 text-red-500">Error loading currencies</div>
          ) : currencies?.length === 0 ? (
            <div className="px-4 py-2 text-gray-400">No currencies</div>
          ) : (
            currencies.map((c) => (
              <div
                key={c.currency}
                onClick={() => handleChange(c.currency)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm ${
                  c.currency === selectedCurrency
                    ? "font-semibold text-[#d98865]"
                    : "text-gray-700"
                }`}
              >
                {c.currency}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Currency;
