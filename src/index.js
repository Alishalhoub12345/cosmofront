import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';   // Tailwind FIRST
import './App.css';     // Your custom styles LAST

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import i18next from 'i18next';
import global_en from "../src/Components/locales/en/global.json"
import global_ar from "../src/Components/locales/ar/global.json"
import { I18nextProvider } from 'react-i18next';


const queryClient = new QueryClient()


i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("lang") || "en", // ✅ FIX
  fallbackLng: "en",
  resources: {
    en: { global: global_en },
    ar: { global: global_ar },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </QueryClientProvider>
  </BrowserRouter>

  // </React.StrictMode>
);

