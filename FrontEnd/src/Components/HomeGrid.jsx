import "./HomeGrid.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "../TranslationContext";

export default function HomeGrid() {
  const { translations } = useTranslation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        // Step 1: Fetch all product IDs (Replace with actual API if needed)
        const productsRes = await fetch("http://localhost:3000/products"); // Adjust if your API is different
        const productsData = await productsRes.json();

        if (!Array.isArray(productsData)) {
          console.error("Invalid product data format", productsData);
          return;
        }

        // Extract product IDs dynamically
        const productIds = productsData.map((product) => product.id);

        let allImages = [];
        for (const id of productIds) {
          // Step 2: Fetch images for each product ID
          const res = await fetch(`http://localhost:3000/product-images/${id}`);
          const data = await res.json();

          if (data.imagePath) {
            allImages.push(data.imagePath); // Store image URL
          }
        }

        setImages(allImages.slice(0, 6)); // Limit to 6 images
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchProductImages();
  }, []);

  // Dynamic CSS classes for different image sizes
  const imgClasses = ["img1", "img2", "img3", "img4"];

  return (
    <div className="headcontainer">
      <h1 className="title">{translations.title}</h1>
      <div className="photo-gallery">
        {[0, 1, 2].map((col) => (
          <div key={col} className="column">
            {images.slice(col * 2, col * 2 + 2).map((img, index) => (
              <img
                key={index}
                className={imgClasses[index % imgClasses.length]}
                src={`https://${img}`}
                alt={`Product ${index}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
