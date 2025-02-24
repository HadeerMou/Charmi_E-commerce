import React, { useEffect, useState } from "react";
import "./checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const orderData = {
        total: totalPrice,
        addressId: 1,
        orderItems: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: parseInt(item.price, 10), // Convert price to integer
        })),
      };
      console.log(typeof orderData.orderItems.price);

      const response = await axios.post(
        "http://localhost:3000/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Order placed", response.data);
      alert("Order placed successfully!");

      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again");
    }
  };
  console.log("Cart Data:", cart);
  useEffect(() => {
    console.log("Received Cart Data in Checkout:", cart);
  }, [cart]);

  return (
    <div className="checkout-container">
      <h2 className="title">Checkout</h2>
      <div className="checkrow">
        <div className="col-75">
          <div className="checkcontainer">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-50">
                  <h3>Billing Address</h3>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="John M. Doe"
                    required
                  />
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="542 W. 15th Street"
                    required
                  />
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    required
                  />
                  <div className="row">
                    <div className="col-50">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="NY"
                        required
                      />
                    </div>
                    <div className="col-50">
                      <label>Zip</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="10001"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/*                 <div className="col-50">
                  <h3>Payment</h3>
                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i
                      className="fa fa-cc-visa"
                      style={{ color: "navy", marginRight: 6 }}
                    ></i>
                    <i
                      className="fa fa-cc-amex"
                      style={{ color: "blue", marginRight: 6 }}
                    ></i>
                    <i
                      className="fa fa-cc-mastercard"
                      style={{ color: "red", marginRight: 6 }}
                    ></i>
                    <i
                      className="fa fa-cc-discover"
                      style={{ color: "orange", marginRight: 6 }}
                    ></i>
                  </div>
                  <label>Name on Card</label>
                  <input
                    type="text"
                    name="cardname"
                    value={formData.cardname}
                    onChange={handleChange}
                    placeholder="John More Doe"
                    required
                  />
                  <label>Credit card number</label>
                  <input
                    type="text"
                    name="cardnumber"
                    value={formData.cardnumber}
                    onChange={handleChange}
                    placeholder="1111-2222-3333-4444"
                    required
                  />
                  <label>Exp Month</label>
                  <input
                    type="text"
                    name="expmonth"
                    value={formData.expmonth}
                    onChange={handleChange}
                    placeholder="September"
                    required
                  />
                  <div className="row">
                    <div className="col-50">
                      <label>Exp Year</label>
                      <input
                        type="text"
                        name="expyear"
                        value={formData.expyear}
                        onChange={handleChange}
                        placeholder="2025"
                        required
                      />
                    </div>
                    <div className="col-50">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="352"
                        required
                      />
                    </div>
                  </div>
                </div> */}
              </div>
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
