import React, { useEffect, useState } from "react";
import CardPicadas from "../../components/client/cards/cardPicadas";
import APIConsultas from "../../services/consultas";
import { useSelector } from "react-redux";
import Head from "next/head";

const Picadas = () => {
  const [arr_picadas, setArr_picadas] = useState([]);
  const state_carrito = useSelector((state) => state.carrito);

  useEffect(() => {
    APIConsultas.picadas.GET().then((repscateg) => {
      setArr_picadas(repscateg);
    });
  }, []);

  // useEffect(() => {
  //   console.log(state_carrito);
  // }, [state_carrito]);

  const checkProduct = (producto) => {
    return state_carrito?.find((e) => e.idpicada === producto.idpicada)
      ? true
      : false;
  };

  return (
    <>
      <Head>
        <title>Lacteos Premium S.A | Picadas</title>
        <meta
          name="description"
          content="Tienda comercial de carnes de campo"
        />
        <link rel="icon" href="/icon-192x192.png" />
      </Head>
      <div className="pt-[100px]  md:px-[8rem] px-8">
        <div className="w-full text-center">
          <h2 className="md:text-[50px] text-[30px] brother-800">
            Nuestras picadas
          </h2>
        </div>
        <div className="flex flex-col gap-8 mt-8">
          {arr_picadas.map((p) => (
            <CardPicadas
              key={p.idpicada}
              info={p}
              check={checkProduct(p)}
            ></CardPicadas>
          ))}
        </div>
      </div>
    </>
  );
};

export default Picadas;
