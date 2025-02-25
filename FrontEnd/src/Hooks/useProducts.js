import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = () => {
  const [products, setProducts] = useState({});
  const fetchProductDetails = async (orders) => {
    try {
      const token = localStorage.getItem("token");
      const productData = {};

      for (const order of orders) {
        if (!Array.isArray(order.orderItems)) continue; // ✅ Ensure orderItems exists

        for (const item of order.orderItems) {
          if (!productData[item.productId]) {
            const response = await axios.get(
              `http://auth-db942.hstgr.io:3306/products/${item.productId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            productData[item.productId] = response.data;
          }
        }
      }

      setProducts(productData);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return { products, fetchProductDetails };
};

export default useProducts;
