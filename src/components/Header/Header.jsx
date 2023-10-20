import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineUser } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import Button from "./Button/Button";

export default function Header() {
  return (
    <header className="flex justify-between p-5 border-slate-500 border-y-2">
      <Link to="/">
        <p>Logo</p>
      </Link>
      <div className="flex items-center text-xl gap-5">
        <Link to="/">
          <AiOutlineUser />
        </Link>
        <Link to="/basket">
          <BsBag />
        </Link>
        <Link to="/new">
          <BiImageAdd />
        </Link>
        <Button text={"Login"} />
      </div>
    </header>
  );
}
