import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!productName.trim() || !price.trim()) {
      setError("Both Product Name and Price are required.");
      return false;
    }

    if (isNaN(price) || Number(price) <= 0) {
      setError("Price must be a positive number.");
      return false;
    }

    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (savedProducts.some((product) => product.name === productName)) {
      setError("Product with the same name already exists.");
      return false;
    }

    return true;
  };

  const handleAddProduct = () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      const newProduct = {
        id: Date.now(),
        name: productName,
        price,
        image: image || "https://via.placeholder.com/150", // Default image
      };

      const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = [...savedProducts, newProduct];

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      setLoading(false);
      navigate("/home"); // Navigate to home page
    }, 1000); // Simulating API call with a delay
  };

  return (
    <div className="add-product-page">
      <h1>Add Product</h1>

      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          id="productName"
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => {
            setError(""); // Clear error when input changes
            setProductName(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => {
            setError(""); // Clear error when input changes
            setPrice(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL:</label>
        <input
          id="image"
          type="text"
          placeholder="Enter image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      {error && <div className="error-toast">{error}</div>} {/* Error display */}
      {loading && <div className="loading-toast">Saving product...</div>} {/* Loading display */}

      <button
        className="add-button"
        disabled={loading} // Prevent multiple submissions
        onClick={handleAddProduct}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProductPage;
