import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/firebase";
import Products from "../Products/Products";

export default function Main() {
  const [products, setProducts] = useState();

  useEffect(() => {
    getProducts().then((items) => setProducts(items));
  }, []);

  return (
    <div className="absolute top-0">
      <div className=" w-full overflow-hidden">
        <img
          src="/images/main_homet.jpg"
          alt=""
          className="w-full max-sm:h-[400px] "
        />
      </div>
      <div className="p-4">
        <h1 className="text-center">Best Seller</h1>
        <ul className="grid grid-cols-4 gap-4">
          {products &&
            products.map((product) => <Products product={product} />)}
        </ul>
        <p>dd</p>
      </div>
    </div>
  );
}
