import React from "react";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useEffect } from "react";

// Fetch currencies from the API
const fetchCurrencies = async () => {
  const response = await axios.get(
    "http://localhost:8000/api/exchange-rates/USD"
  );
  return response.data;
};

const getUserLocation = async () => {
  try {
    // const ipResponse = await axios.get("https://api.ipify.org?format=json");
    // const userIP = ipResponse.data.ip;
    const locationResponse = await axios.get(
      `https://api.getgeoapi.com/v2/ip/check?api_key=06d321c862bb04cf759e29b5f5adc30d2c857aba`
    );
    localStorage.setItem("location", JSON.stringify(locationResponse.data));
    return locationResponse.data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return {};
  }
};

const allowedCurrencies = [
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

const useInitialCurrency = () => {
  return useQuery("initialCurrency", async () => {
    const storedCurrency = localStorage.getItem("currencyUsed");

    if (storedCurrency) {
      return storedCurrency;
    }

    const locationData = await getUserLocation();
    const userCurrency = locationData.currency.code || "USD";
    if (allowedCurrencies.includes(userCurrency)) {
      localStorage.setItem("currencyUsed", userCurrency);
      return userCurrency;
    } else {
      localStorage.setItem("currencyUsed", "USD");
      return "USD";
    }
  });
};

const Currency = () => {
  const queryClient = useQueryClient();
  const { data: initialCurrency } = useInitialCurrency();

  useEffect(() => {
    getUserLocation();
  }, []);

  const {
    data: currencies,
    error,
    isLoading,
  } = useQuery("currencies", fetchCurrencies);

  const mutation = useMutation((currencyUsed) => {
    localStorage.setItem("currencyUsed", currencyUsed);
    queryClient.invalidateQueries("currencies");
    window.location.reload();
  });

  if (isLoading) return <div>{initialCurrency}</div>;
  if (error) return <div>{initialCurrency}</div>;

  return (
    <div>
      <div>
        <select
          className="border-none bg-transparent md:text-[12px] md:text-white"
          value={initialCurrency}
          onChange={(e) => mutation.mutate(e.target.value)}
        >
          {currencies?.map((currency) => (
            <option key={currency.currency} value={currency.currency}>
              {currency.currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Currency;
