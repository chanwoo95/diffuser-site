import React, { useEffect, useState } from "react";
import { loadCart } from "../api/firebase";

export default function Basket() {
  const [products, setProducts] = useState();

  useEffect(() => {
    loadCart().then((item) => {
      setProducts(item);
    });
  }, []);
  return (
    <section className=" flex m-auto px-5 py-10 h-full">
      <div className="w-[80%] h-full">
        <ul>
          {products && products.map((product) => <li> {product.title} </li>)}
        </ul>
      </div>
      <div className="w-[350px] h-full p-5  bg-slate-200">
        <h2 className="font-bold">결제 정보</h2>
        <div className="my-3 border-[1px] border-zinc-400"></div>

        <ul className="h-full py-2">
          {products &&
            products.map((product) => (
              <li className="flex justify-between text-sm my-2">
                <strong>{product.title}</strong>
                <p>{product.price}</p>
              </li>
            ))}
        </ul>
        <div className="my-3 border-[1px] border-zinc-400"></div>

        <div className="flex justify-between">
          <em>총 합계</em>
          <p>10000원</p>
        </div>
        <button className="w-full mt-3 p-2 text-white bg-black hover:opacity-70  ">
          order
        </button>
      </div>
    </section>
  );
}
