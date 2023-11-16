import React from "react";
import { updatedProducts } from "../../api/firebase";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiX } from "react-icons/fi";

export default function ProductItem({
  uid,
  product,
  product: { id, title, quantity, image },
}) {
  const handleMinus = (product) => {
    if (product.quantity <= 1) {
      return;
    }
    updatedProducts(uid, { ...product, quantity: quantity - 1 });
  };

  const handlePlus = (product) => {
    updatedProducts(uid, { ...product, quantity: quantity + 1 });
  };

  return (
    <li key={id} className="flex justify-between my-3">
      <div className="flex w-[400px]">
        <img
          className="w-[100px] h-[120px] mr-3"
          src={image}
          alt="product_image"
        />
        <strong className="text-sm">{title}</strong>
      </div>
      <div className="flex justify-center items-center w-20">
        <AiOutlineMinus
          className="cursor-pointer"
          onClick={() => handleMinus(product)}
        />
        <p className="px-4">{quantity}</p>
        <AiOutlinePlus
          className="cursor-pointer"
          onClick={() => handlePlus(product)}
        />
      </div>
      <FiX />
    </li>
  );
}
