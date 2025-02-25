import React, { useEffect, useState } from "react";
import "./checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardname: "",
    cardnumber: "",
    expmonth: "",
    expyear: "",
    cvv: "",
    sameadr: true,
  });

  const fetchDefaultAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Unauthorized: Please log in again");
        return;
      }

      const response = await axios.get(
        `http://mediumturquoise-dunlin-253877.hostingersite.com /address/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const defaultAddr = response.data.find((address) => address.isDefault);
      console.log("API Response:", response.data);

      if (defaultAddr) {
        setDefaultAddress(defaultAddr);
        setDefaultAddressId(defaultAddr.id);
        console.log("Fetched Default Address:", defaultAddr);
      } else {
        alert("No default address found. Please set one in your profile.");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error fetching default address:", error);
    }
  };

  useEffect(() => {
    fetchDefaultAddress();
  }, []);

  useEffect(() => {
    if (defaultAddress) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstname: defaultAddress.fullName || "",
        email: defaultAddress.email || "",
        address: defaultAddress.street || "",
        city: defaultAddress.city || "",
        state: defaultAddress.state || "",
        zip: defaultAddress.zip || "",
      }));
    }
    console.log("Updated Default Address:", defaultAddress);
  }, [defaultAddress]);

  useEffect(() => {
    console.log("Updated Default Address ID:", defaultAddressId);
  }, [defaultAddressId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!defaultAddressId) {
      alert(
        "No default address found. Please select an address before proceeding."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const orderData = {
        total: totalPrice,
        addressId: defaultAddressId,
        orderItems: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: parseInt(item.price, 10),
        })),
      };

      console.log("Final Address ID:", defaultAddressId);
      console.log("Order Payload:", JSON.stringify(orderData, null, 2));

      const response = await axios.post(
        "http://mediumturquoise-dunlin-253877.hostingersite.com /orders",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Order placed", response.data);
      alert("Order placed successfully!");
      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error);
      alert(
        `Failed to place order: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="title">Checkout</h2>
      <div className="checkrow">
        <div className="col-75">
          <div className="checkcontainer">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-50">
                  <h3>Shipping Address</h3>
                  {defaultAddress ? (
                    <div>
                      <p>
                        <strong>{defaultAddress.fullName}</strong>
                      </p>
                      <p>
                        {defaultAddress.street}, {defaultAddress.city},{" "}
                        {defaultAddress.state}, {defaultAddress.zip}
                      </p>
                      <p>{defaultAddress.country}</p>
                    </div>
                  ) : (
                    <p>
                      No default address found. Please set one in your profile.
                    </p>
                  )}
                </div>
              </div>
              <h3>Shipping Address</h3>
              {defaultAddressId ? (
                <p>Using your default address for shipping.</p>
              ) : (
                <p>No default address found. Please set one in your profile.</p>
              )}
              <label>
                <input
                  type="checkbox"
                  name="sameadr"
                  checked={formData.sameadr}
                  onChange={handleChange}
                />{" "}
                Shipping address same as billing
              </label>
              <button type="submit" className="btn">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>

        <div className="col-25">
          <div className="ordcontainer">
            <div className="ordertop">
              <h4>Order Summary</h4>
              <h4>
                <span className="">
                  <i className="fa fa-shopping-cart"></i> <b>{cart.length}</b>
                </span>
              </h4>
            </div>

            {cart.map((item) => (
              <p className="prodOrd" key={item.productId}>
                <img src={item.image} alt={item.name} />{" "}
                <span className="price">
                  {item.name} x {item.quantity} - ${item.price * item.quantity}
                </span>
              </p>
            ))}

            <hr className="checkhr" />
            <p>
              Total{" "}
              <span className="price">
                <b>${totalPrice.toFixed(2)}</b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
