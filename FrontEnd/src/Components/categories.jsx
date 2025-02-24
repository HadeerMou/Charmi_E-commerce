import "./productList.css";
import { useTranslation } from "../TranslationContext";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCurrency } from "../CurrencyContext";
import axios from "axios";
import Header from "./header";

function Categories({ addToCart }) {
  const { translations } = useTranslation();
  const navigate = useNavigate();
  const { selectedCurrency, convertAmount } = useCurrency();
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:3000/category"
        );
        const productResponse = await axios.get(
          "http://localhost:3000/products"
        );

        if (categoryResponse.data && productResponse.data) {
          setCategories(categoryResponse.data);

          let categoryProducts = {};
          for (const category of categoryResponse.data) {
            // Get first 4 products for each category
            const filteredProducts = productResponse.data
              .filter((product) => product.categoryId === category.id)
              .slice(0, 4);

            // Fetch images for each product
            const productsWithImages = await Promise.all(
              filteredProducts.map(async (product) => {
                const imageResponse = await axios.get(
                  `http://localhost:3000/product-images/product/${product.id}`
                );

                const imageUrl =
                  imageResponse.data && imageResponse.data.length > 0
                    ? `https://${imageResponse.data[0].imagePath}`
                    : "/path/to/default/image.jpg"; // Fallback image

                return { ...product, imageUrl };
              })
            );

            categoryProducts[category.id] = productsWithImages;
          }

          setProductsByCategory(categoryProducts);
        }
      } catch (error) {
        console.error("Error loading categories and products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  if (isLoading) {
    return <p>Loading categories and products...</p>;
  }

  return (
    <>
      <div className="home-page">
        {categories.map((category) => (
          <div key={category.id} className="category-section">
            <div className="sc1">
              <h1 className="DesignTitle">{category.name}</h1>
            </div>
            <div className="webs">
              {productsByCategory[category.id]?.map((product) => (
                <div key={product.id} className="product">
                  <div className="img">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      onClick={() =>
                        navigate(`/product/${product.id}`, {
                          state: { product },
                        })
                      }
                    />
                  </div>
                  <div className="content">
                    <h3>{product.name}</h3>
                    <p>
                      {selectedCurrency === "egp" ? "E£" : "$"}
                      {convertAmount(product.price).toFixed(2)}
                    </p>
                    <div className="bottom">
                      <button
                        className="addtocart"
                        onClick={() => addToCart(product)}>
                        {translations.addtocart}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="more">
              <a
                onClick={() =>
                  navigate("/categorypage", {
                    state: {
                      categoryId: category.id,
                      categoryName: category.name,
                    },
                  })
                }>
                <h3 className="showmore">{translations.showmore}</h3>
                <i className="bi bi-arrow-right-circle-fill arrow ms-2"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Categories;
