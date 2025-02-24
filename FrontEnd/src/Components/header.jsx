import logo from "../logo.png";
import "./header.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "../TranslationContext"; // Import translation hook
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../CurrencyContext";
import axios from "axios";

function Header({
  toggleProductsVisibility,
  toggleCartVisibility,
  totalQuantity,
}) {
  const [cart, setCart] = useState([]); // ✅ Define cart state

  const navigate = useNavigate();
  const { translations, changeLanguage } = useTranslation(); // Using translation context
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English
  const { selectedCurrency, changeCurrency } = useCurrency(); // Using currency context

  const fetchUserCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);

      setCart(response.data); // Update cart state
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    changeLanguage(newLanguage); // Update language in context
  };

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    changeCurrency(newCurrency); // Update Currency in context
  };

  // Simulate login state (replace this with actual login state logic)
  const isLoggedIn = localStorage.getItem("token"); // You can check a token or user data here
  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/profile"); // Navigate to profile if logged in
    } else {
      navigate("/register"); // Navigate to register if not logged in
    }
  };
  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/user-login"); // Redirect to login page
  };

  return (
    <header className="bg-light shadow-sm">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center p-3">
          <a href="" className="logodiv d-flex align-items-center">
            <img src={logo} alt="Logo" className="logo img-fluid" />
          </a>
          <div className="d-flex align-items-center">
            <div className="curr">
              <select
                name="curr"
                id="sel"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
              >
                <option value="egp">Egp</option>
                <option value="dollar">Dollar</option>
              </select>
            </div>
            <div className="lang">
              <select
                name="language"
                id="sel"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>

            <div className="position-relative me-3">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-3"></i>
              <input
                name="search"
                type="search"
                className="form-control ps-5 rounded-pill"
                placeholder={translations.search} // Dynamic placeholder based on language
              />
            </div>
            <div className="mainlinks">
              {isLoggedIn ? (
                <button className="logout" onClick={handleLogout}>
                  Log Out
                </button>
              ) : null}
              <a className="text-dark me-3" onClick={handleClick}>
                <i className="bi bi-person"></i>
              </a>
            </div>
            <div className="icon-cart">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
                height="20px"
                width="18px"
                onClick={toggleCartVisibility}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
                />
              </svg>
              <span>{totalQuantity}</span>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-white border-top">
        <div className="container">
          <ul className="links nav justify-content-center">
            <li className="nav-item">
              <a
                onClick={() => navigate("/")}
                className="home nav-link text-dark"
              >
                {translations.home}
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="products nav-link text-dark"
                onClick={toggleProductsVisibility}
              >
                {translations.products}
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => navigate("/about")}
                className="about nav-link text-dark"
              >
                {translations.about}
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => navigate("/contact")}
                className="contact nav-link text-dark"
              >
                {translations.contact}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
