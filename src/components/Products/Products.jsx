import React from "react";
import { useNavigate } from "react-router-dom";

export default function Products({ product }) {
  const { id, title, imageURL, price } = product;

  const navigate = useNavigate();

  return (
    <li
      className="cursor-pointer"
      onClick={() => navigate(`/detail/${id}`, { state: product })}
    >
      <img src={imageURL} alt="product_img" />
      <p>{title}</p>
      <p>{price}</p>
    </li>
  );
}
