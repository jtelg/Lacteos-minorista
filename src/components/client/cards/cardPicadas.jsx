import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { ADD_CARD, DELETE_CART } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const CardPicadas = ({ info, check }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [personas, setPersonas] = useState(2);
  const count = useRef(2);

  useEffect(() => {
    setData({ ...info, personas: count.current });
  }, [info]);

  const changeCount = (e, type) => {
    e.preventDefault();
    if (personas < 10 && type === "suma") {
      setPersonas(personas + 2);
      count.current = count.current + 2;
    } else if (personas > 2 && type === "resta") {
      setPersonas(personas - 2);
      count.current = count.current - 2;
    }
    data.personas = count.current;
    setData(data);
  };

  const agregarCarrito = () => {
    dispatch(ADD_CARD(data));
  };

  const eliminarCarrito = (id) => {
    dispatch(DELETE_CART(id));
  };

  return (
    <div
      className={`w-full h-[500px] flex  bg-[#FAFAFA] rounded-[30px] overflow-hidden hover:shadow-[0_2px_5px_rgba(0,0,0,0.1)] shadow-[0_2px_5px_rgba(0,0,0,30%)]`}
    >
      <div className="w-[50%]">
        <img src="/media/picada.jpg" className="h-full w-full object-cover" />
      </div>
      <div className="p-8 w-[50%] flex flex-col justify-between">
        <h1 className="uppercase brother-800 text-3xl">
          Picada <span className="text-secondary">{data.nombre}</span>
        </h1>
        <div className="h-[65%] flex ">
          <div className="w-[50%]">
            <p className="whitespace-pre-wrap brother-500">
              {data.ingredientes}
            </p>
          </div>
          <div className="flex flex-col justify-end items-center text-center gap-2">
            <h2>Haz tu pedido desde aqui.</h2>
            <div className="flex items-center w-[50%] justify-between rounded-lg overflow-hidden text-2xl">
              <button
                onClick={(e) => changeCount(e, "resta")}
                className="bg-primary-500 text-white w-[40px] flex items-center justify-center font-extrabold py-1"
              >
                -
              </button>
              <p>{personas}</p>
              <button
                onClick={(e) => changeCount(e, "suma")}
                className="bg-primary-500 text-white w-[40px] flex items-center justify-center font-extrabold py-1"
              >
                +
              </button>
            </div>
            <span className="text-xs">
              A eleccion personal, para 2, 4, 6, 8, 10 personas
            </span>
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={() =>
              check ? eliminarCarrito(data.idpicada) : agregarCarrito()
            }
            className="flex justify-center items-center gap-1 bg-primary-500 brother-500 text-white w-full text-xl py-1 rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_5px_rgba(0,0,0,30%)]"
          >
            {check ? (
              <span className="flex items-center justify-between gap-1">
                <span className="material-symbols-outlined">
                  remove_shopping_cart
                </span>
                Eliminar del carrito
              </span>
            ) : (
              <span className="flex items-center justify-between gap-1">
                <span className="material-symbols-outlined">shopping_cart</span>
                Agregar al Carrito
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPicadas;
