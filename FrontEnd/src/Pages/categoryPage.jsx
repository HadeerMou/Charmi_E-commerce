import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Products from "../Components/products";
import ProductList from "../Components/ProductList";
import Categories from "../Components/categories";

function CategoryPage({
  toggleCartVisibility,
  toggleProductsVisibility,
  cart,
  showProducts,
  products,
  addToCart,
}) {
  return (
    <>
      <Header
        toggleProductsVisibility={toggleProductsVisibility}
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
      />
      <ProductList products={products} addToCart={addToCart} />
      <Footer />
    </>
  );
}

export default CategoryPage;
