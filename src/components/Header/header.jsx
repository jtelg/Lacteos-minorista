import React from "react";
import Link from "next/link";
import Desktop from "./desktop";
import Mobile from "./mobile";
import { useSelector } from "react-redux";

const Header = () => {
  const state_carrito = useSelector((state) => state.carrito);
  const state_nav = useSelector((state) => state.arr_nav);

  return (
    <header className="w-screen md:h-[80px] h-[70px]  bg-primary-500 md:px-[8rem] px-10 py-3 flex justify-between items-center md:border-b-6 border-b-4 border-secondary fixed top-0 left-0 z-[1000]">
      <Link href="/" className="md:w-[30%]">
        <img
          src="/media/logoGrande.png"
          alt="logo"
          className="md:w-[200px] w-[170px]"
        />
      </Link>
      <div className="">
        <Desktop state_carrito={state_carrito} state_nav={state_nav}></Desktop>
        <Mobile state_carrito={state_carrito} state_nav={state_nav}></Mobile>
      </div>
    </header>
  );
};

export default Header;
