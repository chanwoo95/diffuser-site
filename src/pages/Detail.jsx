import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { addCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthProvider";

export default function Detail() {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, uid } = useAuthContext();
  const location = useLocation();
  const { id, title, imageURL, price, description, category } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { id, title, imageURL, price };
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }
    addCart(uid, product, quantity);
    alert("장바구니에 추가되었습니다!");
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
    <section className="p-3">
      <h2 className="mb-3"> category> {category} </h2>
      <div className="flex">
        <div className="w-1/2">
          <img src={imageURL} alt="product_image" className="w-full" />
        </div>
        <div className="px-2">
          <form onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <p>{price} 원</p>
            <p>{description}</p>
            <div className="flex items-center justify-between p-5 w-[150px] h-10 gap-2 border-solid border-2 border-slate-300">
              <AiOutlineMinus
                className={`${
                  quantity <= 1
                    ? " text-slate-300"
                    : "text-black cursor-pointer"
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
      </div>
    </section>
  );
}
