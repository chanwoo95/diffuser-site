import React from "react";
import { useNavigate } from "react-router-dom";

export default function Products({ product }) {
  const { id, title, image, price } = product;

  const navigate = useNavigate();

  return (
    <li
      className=""
      onClick={() => navigate(`/detail/${id}`, { state: product })}
    >
      <img src={image} alt="" />
      <p>{title}</p>
      <p>{price}</p>
    </li>
  );
}
