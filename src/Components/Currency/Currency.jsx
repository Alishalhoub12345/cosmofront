import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { createPortal } from "react-dom";

// Fetch available currencies and rates from backend
const fetchCurrencies = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/exchange-rates/USD");
    return response.data; // [{ currency: "USD", rate: 1 }, ...]
  } catch {
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

export default function Currency() {
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isOpen, setIsOpen] = useState(false);

  const { data: currencies = [], error, isLoading } = useQuery(
    "currencies",
    fetchCurrencies,
    { staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    const saved = localStorage.getItem("currencyUsed") || "USD";
    setSelectedCurrency(saved);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem("currencyUsed", currency);
    setIsOpen(false);
    window.location.reload();
  };

  // Compute viewport position for the floating menu
  const rect = btnRef.current?.getBoundingClientRect();
  const left = rect
    ? Math.max(8, Math.min(window.innerWidth - 176 - 8, rect.left))
    : 8;
  const top = rect ? rect.bottom + 8 : 56;

  const menu = isOpen && rect
    ? createPortal(
        <>
          {/* Backdrop to catch outside clicks/taps */}
          <div
            className="fixed inset-0 z-[99998]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* The dropdown itself */}
          <div
            ref={menuRef}
            style={{ top, left }}
            className="fixed z-[99999] w-35 bg-white border border-gray-300 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()} // keep clicks inside
          >
            {isLoading && (
              <div className="px-4 py-2 text-gray-500">Loading...</div>
            )}
            {error && (
              <div className="px-4 py-2 text-red-500">Error loading currencies</div>
            )}
            {!isLoading && !error && currencies.length === 0 && (
              <div className="px-4 py-2 text-gray-400">No currencies</div>
            )}
            {!isLoading &&
              !error &&
              currencies.map((c) => (
                <button
                  key={c.currency}
                  onClick={() => handleChange(c.currency)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    c.currency === selectedCurrency
                      ? "font-semibold text-[#d98865]"
                      : "text-gray-700"
                  }`}
                >
                  {c.currency}
                </button>
              ))}
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <div className="inline-block text-left">
      <button
        ref={btnRef}
        onClick={() => setIsOpen((p) => !p)}
        className="sm:text-white text-black text-sm font-medium cursor-pointer"
      >
        {selectedCurrency}
      </button>
      {menu}
    </div>
  );
}
