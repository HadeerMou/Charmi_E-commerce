import React from "react";

export default function FavoritesPage({ favorites }) {
  return (
    <div>
      <h1>Your Favorites</h1>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div key={product.id} className="favorite-item">
              <img src={`/assets/${product.image}`} alt={product.name} />
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price}</div>
            </div>
          ))
        ) : (
          <p>You have no favorites yet.</p>
        )}
      </div>
    </div>
  );
}
