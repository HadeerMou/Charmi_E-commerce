import { useState, useEffect } from "react";
import axios from "axios";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized: Please log in again");
        return;
      }

      const response = await axios.get(
        "http://auth-db942.hstgr.io:3306/orders/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(response.data);
      /*       fetchProductDetails(response.data);
       */
      console.log("Fetched Orders:", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, fetchOrders };
};

export default useOrders;
