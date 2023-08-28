import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/header/Header";
import HomePage from "./pages/Home/HomePage";
import Footer from "./common/footer/Footer";
import SignInPage from "./pages/sign-in/SignInPage";
import SignUpPage from "./pages/sign-up/SignUpPage";
import CartPage from "./pages/cart/CartPage";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import DeliveryPage from "./pages/delivery/DeliveryPage";
import Transaction from "./pages/transaction/Transaction";
import Success from "./pages/response/Success";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./utils/authProvider";
import RequiredAuth from "./utils/RequiredAuth";
import UnRequiredAuth from "./utils/UnRequiredAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const client = new QueryClient();
  const [showSidebarCategory, setShowSidebarCategory] = useState(false)
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
      <Router>
        <Header setShowSidebarCategory={setShowSidebarCategory} showSidebarCategory={showSidebarCategory}/>
        <Routes>
          <Route path="/" exact element={
              <HomePage showSidebarCategory={showSidebarCategory} />
            }
          />
          <Route path="/signup" exact element={<SignUpPage />} />
          <Route path="/product" exact element={<ProductsPage />} />
          <Route path="/product/:ProductId" exact element={<ProductDetailPage />} />

          <Route path="/login" exact element={<UnRequiredAuth><SignInPage /></UnRequiredAuth>} />

          <Route path="/cart" exact element={<RequiredAuth><CartPage /></RequiredAuth>} />
          <Route path="/user" exact element={<RequiredAuth><ProfilePage /></RequiredAuth>} />
          <Route path="/delivery" exact element={<RequiredAuth><DeliveryPage /></RequiredAuth>} />
          <Route path="/track" exact element={<RequiredAuth><Transaction /></RequiredAuth>} />
          <Route path="/pay/success" exact element={<RequiredAuth><Success /></RequiredAuth>} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" autoClose={1000}/>
      </Router>
      <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider >
    </AuthProvider>
    
  );
}

export default App;
