import React, { useState, useEffect } from "react";
import "./../styles/HomePage.css";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]); // State for all products
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  const navigate = useNavigate();

  useEffect(() => {
    // Load products from local storage when the component mounts
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  useEffect(() => {
    // Filter products based on the search query
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts); // Update the state
    localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update local storage
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Hi-Fi Shop & Service</h1>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Product List Section */}
      <div className="section">
        <h2>Products</h2>

        {filteredProducts.length > 0 ? (
          <div className="product-list">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        ) : (
          <p className="no-products-message">No Product Found</p>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="add-product-fab"
        onClick={() => navigate("/add-product")}
      >
        +
      </button>
    </div>
  );
};

export default HomePage;
