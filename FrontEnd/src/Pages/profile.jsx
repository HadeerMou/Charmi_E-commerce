import React, { useEffect, useState } from "react";
import "./profile.css";
import Header from "../Components/header";
import Products from "../Components/products";
import Footer from "../Components/footer";
import { useTranslation } from "../TranslationContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile({
  toggleCartVisibility,
  toggleProductsVisibility,
  cart,
  showProducts,
}) {
  const { translations } = useTranslation();
  const [visibleDiv, setVisibleDiv] = useState("first"); // "first" or "second"
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState(null);

  // Retrieve address from local storage on component mount
  useEffect(() => {
    const storedAddress = JSON.parse(localStorage.getItem("userAddress"));
    if (storedAddress) {
      setUserAddress(storedAddress);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token for authentication
            },
          }
        );
        setUserData(response.data.data);
      } catch (err) {
        setError("Failed to load profile.");
        console.error("Profile Fetch Error:", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <Header
        toggleProductsVisibility={toggleProductsVisibility}
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
      />
      <Products showProducts={showProducts} />
      <div class="mycontent">
        <h1 className="welcome">{translations.welcome}</h1>
      </div>
      <div className="profile">
        <div class="left">
          <div class="lists">
            <div class="image">
              <img src="" alt="" />
            </div>
            <div class="username">
              <h2>{userData?.username}</h2>
              <h3>{userData?.email}</h3>
            </div>
            <div class="options">
              <ul>
                <li
                  onClick={() => setVisibleDiv("first")}
                  className="personalinfo"
                >
                  {translations.personalinfo}
                </li>
                {/* <li className="billing">{translations.billing}</li> */}
                <li
                  onClick={() => setVisibleDiv("second")}
                  className="ordersname"
                >
                  {translations.ordersname}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="persinfo"
          style={{ display: visibleDiv === "first" ? "block" : "none" }}
        >
          <div className="infos">
            <h5 className="username">{translations.username}</h5>
            <p className="profdata">
              {userData?.username}
              <i class="fa-solid fa-pen-to-square"></i>
            </p>
          </div>
          <div className="infos">
            <h5 className="email">{translations.email}</h5>
            <p className="profdata">
              {userData?.email}
              <i class="fa-solid fa-pen-to-square"></i>
            </p>
          </div>
          <div className="infos">
            <h5 className="number">{translations.number}</h5>
            <p className="profdata">
              {userData?.phone}
              <i class="fa-solid fa-pen-to-square"></i>
            </p>
          </div>
          <div className="passinfo">
            <h5 className="password">{translations.password}</h5>
            <button
              className="changpass"
              onClick={() => navigate("/forgot-password")}
            >
              {translations.changpass}
            </button>
          </div>
          <div className="infos">
            <h5 className="address">Address</h5>
            <p className="addp">
              <i class="fa-solid fa-location-dot"></i>
              {userAddress
                ? `${userAddress.streetName}, ${userAddress.districtId}, ${userAddress.cityId}, ${userAddress.countryId}`
                : "No address found"}
              <i
                class="fa-solid fa-pen-to-square"
                onClick={() => navigate("/profile/address")}
              ></i>
            </p>
          </div>
        </div>
        {/*         <div
          className="ordersinfo"
          style={{ display: visibleDiv === "second" ? "block" : "none" }}
        >
          <div class="head">
            <h1 className="ordersname">{translations.ordersname}</h1>
          </div>
          <a>
            <div class="ordersContainer">
              <div class="orderno">
                <h3 className="text-muted">#3475</h3>
              </div>
              <div class="img">
                <img src="/assets/bedside.png" alt="" />
              </div>

              <div class="orderprice">
                <p class="text-muted">2500Egp</p>
              </div>
              <div class="no">
                <p class="text-muted">11:40PM</p>
              </div>
            </div>
          </a>
          <a>
            <div class="ordersContainer">
              <div class="orderno">
                <h3 className="text-muted">#3475</h3>
              </div>
              <div class="img">
                <img src="/assets/bedside.png" alt="" />
              </div>

              <div class="orderprice">
                <p class="text-muted">2500Egp</p>
              </div>
              <div class="no">
                <p class="text-muted">11:40PM</p>
              </div>
            </div>
          </a>
          <a>
            <div class="ordersContainer">
              <div class="orderno">
                <h3 className="text-muted">#3475</h3>
              </div>
              <div class="img">
                <img src="/assets/bedside.png" alt="" />
              </div>

              <div class="orderprice">
                <p class="text-muted">2500Egp</p>
              </div>
              <div class="no">
                <p class="text-muted">11:40PM</p>
              </div>
            </div>
          </a>
          <a>
            <div class="ordersContainer">
              <div class="orderno">
                <h3 className="text-muted">#3475</h3>
              </div>
              <div class="img">
                <img src="/assets/bedside.png" alt="" />
              </div>

              <div class="orderprice">
                <p class="text-muted">2500Egp</p>
              </div>
              <div class="no">
                <p class="text-muted">11:40PM</p>
              </div>
            </div>
          </a>
        </div> */}
      </div>

      <Footer />
    </>
  );
}

export default Profile;
