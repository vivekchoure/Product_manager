import React from "react";
import "../styles/ProductCard.css";

const ProductCard = ({ product, onDelete }) => {
  const { id, name, availability, price, image } = product;

  return (
    <div className="product-card">
      <div className="image-container">
        <button className="delete-button" onClick={() => onDelete(id)}>
          🗑️
        </button>
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p
          className={`product-availability ${
            availability ? "available" : "out-of-stock"
          }`}
        >
          {availability ? "Available" : "Out of Stock"}
        </p>
        <p className="product-price">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
