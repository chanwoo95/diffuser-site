import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { addCart } from "../api/firebase";

export default function Detail() {
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const { id, title, image, price } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { id, title, image, price };
    addCart(product, quantity);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <section className="flex p-3">
      <div className="w-1/2">
        <img src={image} alt="product_image" className="w-full" />
      </div>
      <div className="px-2">
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <p>{price} 원</p>
          <div className="flex items-center justify-between p-5 w-[150px] h-10 gap-2 border-solid border-2 border-slate-300">
            <AiOutlineMinus
              className={`${
                quantity <= 1 ? " text-slate-300" : "text-black cursor-pointer"
              } text-xl`}
              onClick={handleMinus}
            />
            <p className="font-bold text-xl">{quantity}</p>
            <AiOutlinePlus
              className="cursor-pointer text-xl"
              onClick={handlePlus}
            />
          </div>
          <button>add</button>
        </form>
      </div>
    </section>
  );
}
