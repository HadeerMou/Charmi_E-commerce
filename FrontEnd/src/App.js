// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/cart";
import "./App.css";
import { TranslationProvider } from "./TranslationContext";
import About from "./Pages/About";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/contact";
import Checkout from "./Pages/checkout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductView from "./Pages/productView";
import Dshproducts from "./Dashboard/dshproducts";
import DshChat from "./Dashboard/DshChat";
import DshUsers from "./Dashboard/DshUsers";
import DshMessages from "./Dashboard/DshMessages";
import DshOrders from "./Dashboard/DshOrders";
import "./Dashboard/dash.css";
import Dashboard from "./Dashboard/dashboard";
import NoAccount from "./Pages/noAccount";
import Profile from "./Pages/profile";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import { CurrencyProvider } from "./CurrencyContext";
import OtpPage from "./Pages/OtpPage";
import EmailInput from "./Pages/emailinput";
import ForgetPass from "./Pages/ResetPass";
import ResetPass from "./Pages/ResetPass";
import Address from "./Pages/address";
import DshCities from "./Dashboard/DshCities";
import DshCountries from "./Dashboard/DshCountries";
import DshCategories from "./Dashboard/DshCategories";
import axios from "axios";
import AdminPage from "./Dashboard/admins";
import ShippingFees from "./Dashboard/ShippingFees";
import ProductDetails from "./Dashboard/ProductDetails";
import CategoryPage from "./Pages/categoryPage";
import OrderSuccess from "./Pages/OrderSuccess";

<FontAwesomeIcon icon="fa-brands fa-cc-visa" />;

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State for cart items
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  // Toggle cart visibility
  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
    console.log("Cart visibility toggled:", !isCartVisible);
  };

  // Fetch user cart when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      fetchUserCart();
      fetchProducts();
    };

    fetchData();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true); // ✅ Set loading before fetching
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
      setIsLoading(false); // ✅ Set loading false after success
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setIsLoading(false); // ✅ Ensure loading stops even on failure
    }
  };

  const fetchUserCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Cart Data:", response.data); // 🔹 See if API returns data

      setCart(response.data.cartItems);
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  // Check if cart state updates
  useEffect(() => {
    console.log("Updated cart:", cart);
  }, [cart]);

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token before adding to cart:", token);

      const response = await axios.post(
        "http://localhost:3000/cart-items",
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API Response Status:", response.status);
      console.log("API Response Data:", response.data);

      // ✅ Ensure we get the updated cart directly from the response
      if (response.data) {
        fetchUserCart(); // Fetch updated cart from backend
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
    }
  };
  useEffect(() => {
    console.log("Updated cart:", cart);
  }, [cart]);

  // Change product quantity in cart
  const changeQuantityInCart = (productId, type) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const index = updatedCart.findIndex((item) => item.id === productId); // Use `id` here for consistency
      if (index >= 0) {
        if (type === "plus") {
          updatedCart[index].quantity += 1;
        } else if (type === "minus") {
          updatedCart[index].quantity -= 1;
          if (updatedCart[index].quantity <= 0) {
            updatedCart.splice(index, 1);
          }
        }
      }
      return updatedCart;
    });
  };

  const [showProducts, setShowProducts] = useState(true); // State to control product visibility

  const toggleProductsVisibility = () => {
    setShowProducts((prevState) => !prevState); // Toggle visibility
  };
  console.log("addToCart function:", addToCart);
  console.log("App.js - isLoading:", isLoading);

  return (
    <CurrencyProvider>
      <TranslationProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                showProducts={showProducts}
                toggleCartVisibility={toggleCartVisibility}
                toggleProductsVisibility={toggleProductsVisibility}
                cart={cart}
                products={products}
                addToCart={addToCart}
                totalQuantity={totalQuantity}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                showProducts={showProducts}
                toggleCartVisibility={toggleCartVisibility}
                toggleProductsVisibility={toggleProductsVisibility}
                cart={cart}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <Contact
                showProducts={showProducts}
                toggleCartVisibility={toggleCartVisibility}
                toggleProductsVisibility={toggleProductsVisibility}
                cart={cart}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/categorypage"
            element={
              <CategoryPage
                showProducts={showProducts}
                products={products}
                cart={cart}
                toggleCartVisibility={toggleCartVisibility}
                toggleProductsVisibility={toggleProductsVisibility}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/product/:productId"
            element={
              <ProductView
                cart={cart}
                toggleCartVisibility={toggleCartVisibility}
                toggleProductsVisibility={toggleProductsVisibility}
                showProducts={showProducts}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                showProducts={showProducts}
                toggleCartVisibility={toggleCartVisibility}
                toggleProductsVisibility={toggleProductsVisibility}
                cart={cart}
                products={products}
              />
            }
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<Dshproducts />} />
          <Route path="/dashboard/messages/chat" element={<DshChat />} />
          <Route path="/dashboard/users" element={<DshUsers />} />
          <Route path="/dashboard/messages" element={<DshMessages />} />
          <Route path="/dashboard/orders" element={<DshOrders />} />
          <Route path="/register" element={<NoAccount />} />
          <Route path="/user-login" element={<Signin userType="USER" />} />
          <Route path="/admin-login" element={<Signin userType="ADMIN" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/email-verification" element={<EmailInput />} />
          <Route path="/forgot-password" element={<EmailInput />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/profile/address" element={<Address />} />
          <Route path="/dashboard/cities" element={<DshCities />} />
          <Route path="/dashboard/countries" element={<DshCountries />} />
          <Route path="/dashboard/categories" element={<DshCategories />} />
          <Route path="/dashboard/admins" element={<AdminPage />} />
          <Route path="/dashboard/shippingfees" element={<ShippingFees />} />
          <Route
            path="/dashboard/products/productdetails/:productId"
            element={<ProductDetails />}
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/productlist"
            element={
              <ProductList
                products={products}
                cart={cart}
                addToCart={addToCart} // Ensure addToCart is passed correctly
              />
            }
          />
        </Routes>

        {/* Conditionally render Cart only when products are loaded */}
        {!isLoading && (
          <Cart
            cart={cart}
            toggleCartVisibility={toggleCartVisibility}
            isCartVisible={isCartVisible}
            products={products}
            fetchUserCart={fetchUserCart}
            setTotalQuantity={setTotalQuantity}
          />
        )}
        <productList addToCart={addToCart} fetchUserCart={fetchUserCart} />
      </TranslationProvider>
    </CurrencyProvider>
  );
}
export default App;
