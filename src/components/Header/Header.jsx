import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineUser } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import Button from "./Button/Button";
import Menu from "./Menu/Menu";
import { useAuthContext } from "../../context/AuthProvider";
import { loadCart } from "../../api/firebase";

export default function Header() {
  const { user, uid, login, logout } = useAuthContext();

  const [active, setActive] = useState(false);
  const [products, setProducts] = useState();

  useEffect(() => {
    loadCart(uid).then((item) => setProducts(item));
  }, [uid]);

  return (
    <header className="fixed w-full p-5 border-slate-500 border-y-2 z-10 bg-slate-50 ">
      <div className="flex justify-between">
        <Link to="/">
          <p>Logo</p>
        </Link>
        <ul className="flex gap-11 max-md:hidden">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          >
            <Link>Shop</Link>
          </li>
          <li>
            <Link>Board</Link>
          </li>
          <li>
            <Link>Review</Link>
          </li>
        </ul>
        <div className="flex items-center text-xl gap-5">
          <Link to="/" className="flex items-center">
            <AiOutlineUser />
            <p>{user && user.displayName}</p>
          </Link>
          {
            <Link to="/basket" className="flex items-center">
              <BsBag />
              <p className="pl-2">{products && products.length}</p>
            </Link>
          }
          {user && user.isAdmins ? (
            <Link to="/new">
              <BiImageAdd />
            </Link>
          ) : (
            ""
          )}
          <Button
            text={user ? "Logout" : "Login"}
            login={user ? logout : login}
          />
        </div>
      </div>
      {active ? <Menu /> : ""}
    </header>
  );
}
