import React from "react";

export default function OrderItem({ product }) {
  const price = parseInt(product.price.replace(/,/g, "")) * product.quantity;

  return (
    <li className="flex justify-between text-sm my-2">
      <strong>
        {product.title} × {product.quantity}
      </strong>
      <p>KRW {price.toLocaleString()}</p>
    </li>
  );
}
