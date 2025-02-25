import React, { useEffect, useState } from "react";
import "./productView.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../TranslationContext";
import Footer from "../Components/footer";
import Header from "../Components/header";
import Products from "../Components/products";
import { useCurrency } from "../CurrencyContext";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductView({
  toggleCartVisibility,
  toggleProductsVisibility,
  cart,
  showProducts,
  addToCart,
  totalQuantity,
}) {
  const { translations } = useTranslation();
  const location = useLocation();
  const { selectedCurrency, convertAmount } = useCurrency();
  const [productImages, setProductImages] = useState([]);
  const [bigImage, setBigImage] = useState("");
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Extracted productId:", productId);

  // Function to render product cards
  const renderProductCard = (product) => {
    // Find the default image if available, otherwise use the first image
    const defaultImage = product.productImages?.find((img) => img.isDefault);
    const imagePath = defaultImage
      ? defaultImage.imagePath
      : product.productImages?.[0]?.imagePath;

    // Construct the full URL for the image
    const imageUrl =
      product.productImages?.length > 0
        ? `https://${product.productImages[0].imagePath}` // Ensure proper formatting
        : "/assets/default.jpg";
    console.log("Product Image Pathhh:", imageUrl);
    console.log(
      "Product Image Path for recommend:",
      product.productImages?.[0]?.imagePath
    );
    return (
      <Link to={`/product/${product.id}`} key={product.id}>
        <div className="web">
          <div className="img">
            <img src={imageUrl} alt={product.name} />
          </div>
          <div className="content">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p className="price">{product.price} EGP</p>
            <div className="productIcon">
              <i
                className="bi bi-cart-plus"
                onClick={() => addToCart(product)}></i>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching product details for ID:", productId);

        const productResponse = await axios.get(
          `http://mediumturquoise-dunlin-253877.hostingersite.com /products/${productId}`
        );
        console.log("Full API Response:", productResponse.data);

        if (
          !productResponse.data ||
          Object.keys(productResponse.data).length === 0
        ) {
          throw new Error("Invalid product data");
        }

        setProduct(productResponse.data);

        // Fetch related products by category only after setting the product
        await fetchRelatedProducts(productResponse.data.categoryId);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRelatedProducts = async (categoryId) => {
      try {
        const relatedResponse = await axios.get(
          `http://mediumturquoise-dunlin-253877.hostingersite.com /category/${categoryId}`
        );

        // Fetch product details for each related product to get images
        const relatedProductsWithImages = await Promise.all(
          relatedResponse.data.products.map(async (product) => {
            const productDetails = await axios.get(
              `http://mediumturquoise-dunlin-253877.hostingersite.com /products/${product.id}`
            );
            return productDetails.data;
          })
        );

        setRelatedProducts(relatedProductsWithImages);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  // Fetch product images
  const fetchProductImages = async (productId) => {
    try {
      const response = await axios.get(
        `http://mediumturquoise-dunlin-253877.hostingersite.com /product-images/product/${productId}`
      );

      console.log("API Response:", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        // Extract image paths correctly
        const imageUrls = response.data.map(
          (img) => `https://${img.imagePath}`
        );

        console.log("Extracted Image URLs:", imageUrls);

        // Set images in state
        setProductImages(imageUrls);
        setBigImage(imageUrls[0]); // Set first image as default
      } else {
        console.error("Invalid API response format", response.data);
        setBigImage("/assets/default.jpg"); // Fallback image
      }
    } catch (error) {
      console.error("Error fetching product images:", error);
      setBigImage("/assets/default.jpg"); // Fallback image
    }
  };

  useEffect(() => {
    if (product && product.id) {
      fetchProductImages(product.id);
    }
  }, [product]); // ✅ Always runs in the same order

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Header
        toggleProductsVisibility={toggleProductsVisibility}
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />
      <Products showProducts={showProducts} />
      <div className="topcontainer">
        <div className="im">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Product"
              onClick={() => setBigImage(img)}
            />
          ))}
        </div>
        <div class="bigImg">
          <img src={bigImage} alt={product.name} />
        </div>
        <div class="des">
          <div class="line">
            <h4 className="prname">{product.name}</h4>
          </div>
          <p className="prdes">{product.description}</p>
          <p class="price">
            {selectedCurrency === "egp" ? "E£" : "$"}
            {convertAmount(product.price).toFixed(2)}
          </p>
          <div class="productviewbuttom">
            <button className="addtocart" onClick={() => addToCart(product)}>
              {translations.addtocart}
            </button>
          </div>
        </div>
      </div>
      <hr className="hr" />
      {/* Related Products Section */}
      <div className="related">
        <section className="web-development">
          <div className="title">
            <h1 className="relatedname">{translations.relatedname}</h1>
          </div>
          <div className="webs">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(renderProductCard)
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </section>
      </div>

      {/* Recommended Products Section */}
      <div className="related">
        <section className="web-development">
          <div className="title">
            <h1 className="recommendedname">{translations.recommendedname}</h1>
          </div>
          <div className="webs">
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map(renderProductCard)
            ) : (
              <p>No recommended products found.</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ProductView;
