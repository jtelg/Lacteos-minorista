import React, { useEffect } from "react";
import Link from "next/link";
import Desktop from "./desktop";
import Mobile from "./mobile";
import { useDispatch, useSelector } from "react-redux";
import localStorage from "../../utils/localstorage";
import { ADD_CARD } from "../../redux/actions";

const Header = () => {
  const dispatch = useDispatch();

  const state_carrito = useSelector((state) => state.carrito);
  // const carritoLocal = localStorage.getFromStorage("arr_carro");

  // useEffect(() => {
  //   if (carritoLocal && state_carrito?.length < 1) {
  //     dispatch(ADD_CARD(carritoLocal));
  //   }
  //   console.log(state_carrito);
  // }, [carritoLocal]);

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
        <Desktop state={state_carrito}></Desktop>
        <Mobile state={state_carrito}></Mobile>
      </div>
    </header>
  );
};

export default Header;
