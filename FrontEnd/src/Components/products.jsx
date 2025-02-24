import "./products.css";
import React, { useState, useEffect } from "react";
import { useTranslation } from "../TranslationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Products({ showProducts }) {
  const { translations } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <>
      {showProducts && (
        <section>
          <div className="pr">
            {categories.map((category) => (
              <div
                key={category.id}
                className="col d-flex flex-column mb-3 w-25"
              >
                <a className="text-decoration-none text-dark">
                  <div
                    className="box"
                    onClick={() =>
                      navigate("/categoryPage", {
                        state: {
                          categoryId: category.id,
                          categoryName: category.name,
                        },
                      })
                    }
                  >
                    <div className="boximg">
                      {category.imagePath ? (
                        <img
                          src={"https://" + category.imagePath}
                          className="card-img-top"
                          alt={category.name}
                        />
                      ) : (
                        <p>No Image Available</p>
                      )}
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{category.name}</h5>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <hr id="hr" />
        </section>
      )}
    </>
  );
}
