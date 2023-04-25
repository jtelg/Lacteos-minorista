import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardPicadas from "../../productos/cardPicadas";
import APIConsultas from "../../../../services/consultas";

const ListProducts = () => {
  const [arr_picadas, setArr_picadas] = useState([]);
  const state_carrito = useSelector((state) => state.carrito);

  useEffect(() => {
    APIConsultas.picadas.GET().then((repscateg) => {
      setArr_picadas(repscateg);
    });
  }, []);

  const checkProduct = (producto) => {
    return state_carrito?.find((e) => e.idpicada === producto.idpicada)
      ? true
      : false;
  };
  return (
    <>
      <div className="flex flex-wrap justify-around gap-8 mt-8">
        {arr_picadas.map((p) => (
          <CardPicadas
            key={p.idpicada}
            info={p}
            check={checkProduct(p)}
          ></CardPicadas>
        ))}
      </div>
    </>
  );
};

export default ListProducts;
