import React, { useEffect, useState } from "react";
import "./profile.css";
import Header from "../Components/header";
import Products from "../Components/products";
import Footer from "../Components/footer";
import { useTranslation } from "../TranslationContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useOrders from "../Hooks/useOrders";
import useProducts from "../Hooks/useProducts";

function Profile({
  toggleCartVisibility,
  toggleProductsVisibility,
  cart,
  showProducts,
  totalQuantity,
}) {
  const { translations } = useTranslation();
  const [visibleDiv, setVisibleDiv] = useState("first"); // "first" or "second"
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order
  const { products, fetchProductDetails } = useProducts();
  const { orders, fetchOrders } = useOrders();

  // Fetch product details when orders are available
  useEffect(() => {
    if (Array.isArray(orders) && orders.length > 0) {
      fetchProductDetails(orders);
    }
  }, [orders]); // Runs whenever `orders` change

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
          "http://mediumturquoise-dunlin-253877.hostingersite.com/users/profile",
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
    fetchOrders(); // Fetch orders when the profile is loaded
    fetchProductDetails();
  }, []);

  return (
    <>
      <Header
        toggleProductsVisibility={toggleProductsVisibility}
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />
      <Products showProducts={showProducts} />
      <div class="mycontent">
        <h1 className="welcome">{translations.welcome}</h1>
      </div>
      <div className="profile">
        <div class="left">
          <div class="lists">
            <div class="username">
              <h2>{userData?.username}</h2>
              <h3>{userData?.email}</h3>
            </div>
            <div class="options">
              <ul>
                <li
                  onClick={() => setVisibleDiv("first")}
                  className="personalinfo">
                  {translations.personalinfo}
                </li>
                {/* <li className="billing">{translations.billing}</li> */}
                <li
                  onClick={() => setVisibleDiv("second")}
                  className="ordersname">
                  {translations.ordersname}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="persinfo"
          style={{ display: visibleDiv === "first" ? "block" : "none" }}>
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
              onClick={() => navigate("/forgot-password")}>
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
                onClick={() => navigate("/profile/address")}></i>
            </p>
          </div>
        </div>
        <div
          className="ordersinfo"
          style={{ display: visibleDiv === "second" ? "block" : "none" }}>
          <div className="head">
            <h1 className="ordersname">Your Orders</h1>
          </div>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="ordersContainer"
                onClick={() => setSelectedOrder(order)}>
                <div className="orderno">
                  <h3 className="text-muted">Order #{order.id}</h3>
                </div>
                <div className="orderprice">
                  <p className="text-muted">Total: {order.total} EGP</p>
                </div>
                <div className="no">
                  <p className="text-muted">
                    Time: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}

          {selectedOrder && (
            <div className="orderDetails">
              <h2>Order #{selectedOrder.id} Details</h2>
              <p>
                <strong>Total Price:</strong> {selectedOrder.total} EGP
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              {selectedOrder.orderItems.map((item) => {
                const product = products[item.productId];
                const imageUrl = product?.productImages?.[0]?.imagePath;

                return (
                  <div key={item.id} className="orderItem">
                    {imageUrl ? (
                      <img
                        src={`https://${imageUrl}`}
                        alt={product?.name}
                        className="product-img"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                    <div>
                      <p>
                        <strong>Product:</strong> {product?.name || "Unknown"}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Price:</strong> {item.price} EGP
                      </p>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => setSelectedOrder(null)}
                className="close-btn">
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
