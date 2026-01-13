import { Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./Pages/HomePage";
import ProductsPerSubcategoryPage from "./Pages/ProductsPerSubcategoryPage";
import ProductsPerCategoryPage from "./Pages/ProductsPerCategoryPage";
import ProductsPerCollectionPage from "./Pages/ProductsPerCollectionPage";
import ProductsOnSalePage from "./Pages/ProductsOnSalePage";
import SingleProductPage from "./Pages/SingleProductPage";
import CartPage from "./Pages/CartPage";

import LoginPage from "./Pages/LoginPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import RegistrationPage from "./Pages/RegistrationPage";
import AddressPage from "./Pages/AddressPage";
import ContactUsPages from "./Pages/ContactUsPages";
import AboutUsPage from "./Pages/AboutUsPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ExchangePolicyPage from "./Pages/ExchangePolicyPage";
import SizeChartPage from "./Pages/SizeChartPage";
import ShippingPolicyPage from "./Pages/ShippingPolicyPage";
import OrderSuccessfulPage from "./Pages/OrderSuccessfulPage";
import PaymentPolicyPage from "./Pages/PaymentPolicyPage";
import TermsAndConditionsPage from "./Pages/TermsAndConditionsPage";
import PersonalInformationPage from "./Pages/PersonalInformationPage";
import OrdersHistoryPage from "./Pages/OrdersHistoryPage";
import OnlinePaymentRedirectPage from "./Pages/OnlinePaymentRedirectPage";
import FAQPage from "./Pages/FAQPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import OrderCanceledPage from "./Pages/OrderCanceledPage";
import DoesntExistPage from "./Pages/DoesntExistPage";
import ManageAddressPage from "./Pages/ManageAddressPage";
import AllProductsForSearchPage from "./Pages/AllProductsForSearchPage";
import ProductsPerDepartmentPage from "./Pages/ProductsPerDepartmentPage";
import AllProductsPerCollectionPage from "./Pages/AllProductsPerCollectionPage";
import AllProductsOnSalePage from "./Pages/AllProductsOnSalePage";
import StoreLocator from "./Pages/StoreLocator";

import Navbar from "./Components/Navbar/Navbar";   // ✅ ADD NAVBAR
import Footer from "./Components/Footer/Footer";   // ✅ ADD FOOTER
import { CartProvider } from "./Components/Cart/CartContext";

function App() {
  return (
    <div className="App">
      <CartProvider>

        <Navbar />

        <Routes>
          <Route exact path="/" Component={HomePage} />

          <Route
            path="/products/department/:departmentLink"
            Component={ProductsPerDepartmentPage}
          />

          <Route
            path="/products/collection"
            Component={AllProductsPerCollectionPage}
          />

          <Route path="/products/sale" Component={AllProductsOnSalePage} />
          <Route
            path="/collection/:collectionLink"
            Component={ProductsPerCollectionPage}
          />
          <Route
            path="/subcategory/products/:subcategoryLink"
            Component={ProductsPerSubcategoryPage}
          />
          <Route path="/products" Component={AllProductsForSearchPage} />
          <Route
            path="/category/products/:categoryLink"
            Component={ProductsPerCategoryPage}
          />
          <Route
            path="/sale/products/:saleLink"
            Component={ProductsOnSalePage}
          />

          <Route
            path="/single/product/:productLink/:productSKU"
            Component={SingleProductPage}
          />

          <Route path="/cart" Component={CartPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/signup-account" Component={RegistrationPage} />
          <Route path="/signup-address" Component={AddressPage} />
          <Route path="/resetpassword/:userId" Component={ResetPasswordPage} />
          <Route path="/contact-us" Component={ContactUsPages} />
          <Route path="/about-us" Component={AboutUsPage} />
          <Route path="/checkout" Component={CheckoutPage} />
          <Route path="/exchange-policy" Component={ExchangePolicyPage} />
          <Route path="/size-chart" Component={SizeChartPage} />

          <Route
            path="/order-successful/:cartRefNumber"
            Component={OrderSuccessfulPage}
          />

          <Route path="/shipping-policy" Component={ShippingPolicyPage} />
          <Route path="/payment-policy" Component={PaymentPolicyPage} />
          <Route path="/terms-policy" Component={TermsAndConditionsPage} />

          <Route path="/account" Component={PersonalInformationPage} />
          <Route path="/account-orders" Component={OrdersHistoryPage} />

          <Route
            path="/online-redirect/:orderId"
            Component={OnlinePaymentRedirectPage}
          />

          <Route
            path="/frequently-asked-questions"
            Component={FAQPage}
          />

          <Route path="/privacy-policy" Component={PrivacyPolicyPage} />

          <Route
            path="/order-canceled/:orderId"
            Component={OrderCanceledPage}
          />

          <Route path="/error-404" Component={DoesntExistPage} />
          <Route path="/manage-address" Component={ManageAddressPage} />

          <Route path="/store-locator" element={<StoreLocator />} />
        </Routes>

        <Footer />

      </CartProvider>
    </div>
  );
}

export default App;
