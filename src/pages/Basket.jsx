import React, { useEffect, useState } from "react";
import { loadCart } from "../api/firebase";

import { useAuthContext } from "../context/AuthProvider";
import ProductItem from "../components/ProductItem/ProductItem";
import OrderItem from "../components/OrderItem/OrderItem";

export default function Basket() {
  const { uid } = useAuthContext();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadCart(uid).then((item) => {
      setProducts(item);
    });
  }, [uid]);

  const totalPrice =
    products &&
    products.reduce(
      (acc, cur) => acc + parseInt(cur.price.replace(/,/g, "")) * cur.quantity,
      0
    );

  return (
    <section className=" flex m-auto px-5 py-10 h-full">
      <div className="w-[80%] h-full mr-4">
        <ul>
          {products &&
            products.map((product) => (
              <ProductItem uid={uid} product={product} />
            ))}
        </ul>
      </div>
      <div className="w-[350px] h-full p-5  bg-slate-200">
        <h2 className="font-bold">Order</h2>
        <div className="my-3 border-[1px] border-zinc-400"></div>

        <ul className="h-full py-2">
          {products &&
            products.map((product) => <OrderItem product={product} />)}
        </ul>
        <div className="my-3 border-[1px] border-zinc-400"></div>

        <div className="flex justify-between">
          <em>TOTAL</em>
          <p>KRW {totalPrice.toLocaleString()}</p>
        </div>
        <button className="w-full mt-3 p-2 text-white bg-black hover:opacity-70  ">
          Order
        </button>
      </div>
    </section>
  );
}
