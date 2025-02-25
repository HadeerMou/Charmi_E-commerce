import "./productList.css";
import { useTranslation } from "../TranslationContext";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCurrency } from "../CurrencyContext";
import axios from "axios";

function ProductList({ addToCart }) {
  const { translations } = useTranslation();
  const navigate = useNavigate();
  const { selectedCurrency, convertAmount } = useCurrency();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Extract category info from state
  const categoryId = location.state?.categoryId;
  const categoryName = location.state?.categoryName || "Products"; // Default title

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://mediumturquoise-dunlin-253877.hostingersite.com/products",
          {}
        );

        console.log("Category ID:", categoryId);

        if (response.data && response.data.length > 0) {
          // Filter products by category ID
          const filteredProducts = response.data.filter(
            (product) => product.categoryId === categoryId
          );

          // Fetch product images
          const productsWithImages = await Promise.all(
            filteredProducts.map(async (product) => {
              const imageResponse = await axios.get(
                `http://mediumturquoise-dunlin-253877.hostingersite.com/product-images/product/${product.id}`
              );

              const imageUrl =
                imageResponse.data && imageResponse.data.length > 0
                  ? `https://${imageResponse.data[0].imagePath}`
                  : "/path/to/default/image.jpg"; // Fallback image if none exists

              return {
                ...product,
                imageUrl,
              };
            })
          );

          console.log("Products with Images:", productsWithImages);
          setProduct(productsWithImages);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }
  console.log("addToCart in ProductList:", addToCart);

  return (
    <div className="product-list">
      <div className="sc1">
        <h1 className="DesignTitle">{categoryName}</h1>
      </div>
      <div className="webs">
        {product.map((product) => (
          <div key={product.id} className="product">
            <div className="img">
              <img
                src={product.imageUrl}
                alt={product.name}
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: { product } })
                }
              />
            </div>
            <div className="content">
              <h3>{product.name}</h3>
              <p>
                {selectedCurrency === "egp" ? "E£" : "$"}
                {product.price && !isNaN(product.price)
                  ? convertAmount(Number(product.price)).toFixed(2)
                  : "N/A"}
              </p>

              <div className="bottom">
                <button
                  className="addtocart"
                  onClick={() => {
                    addToCart(product);
                  }}>
                  {translations.addtocart}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
