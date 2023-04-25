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
    setData({ ...info, cantidadForm: count.current });
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
    data.cantidadForm = count.current;
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
      className={`w-[320px] h-[500px] flex  flex-col bg-[#FAFAFA] rounded-[30px] overflow-hidden hover:shadow-[0_2px_5px_rgba(0,0,0,0.1)] shadow-[0_2px_5px_rgba(0,0,0,30%)]`}
    >
      <div className="w-full h-[50%]">
        <img src="/media/picada.jpg" className="h-full w-full object-cover" />
      </div>
      <div className="p-4 w-full flex flex-col justify-between">
        <h1 className="uppercase brother-800 text-[24px]">
          Picada <span className="text-secondary">{data.nombre}</span>
        </h1>
        <div>
          <div className="text-[14px] h-[100px] mb-2 overflow-hidden ">
            <span className="brother-500">Ingedientes:</span>
            <p>{data.ingredientes}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-end gap-2">
            <div className="flex items-center w-full gap-3 justify-between rounded-lg overflow-hidden text-lg">
              <button
                onClick={(e) => changeCount(e, "resta")}
                className="bg-primary-500 text-white w-[30px] flex items-center justify-center font-extrabold py-1"
              >
                -
              </button>
              <p>{personas}</p>
              <button
                onClick={(e) => changeCount(e, "suma")}
                className="bg-primary-500 text-white w-[30px] flex items-center justify-center font-extrabold py-1"
              >
                +
              </button>
            </div>
          </div>
          <div className="py-2">
            <button
              onClick={() =>
                check ? eliminarCarrito(data.idpicada) : agregarCarrito()
              }
              className="flex justify-center items-center gap-1 bg-primary-500 brother-500 text-white text-base p-2 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_5px_rgba(0,0,0,30%)]"
            >
              {check ? (
                <span className="flex items-center justify-between gap-1">
                  <span className="material-symbols-outlined text-[20px]">
                    remove_shopping_cart
                  </span>
                </span>
              ) : (
                <span className="flex items-center justify-between gap-1">
                  <span className="material-symbols-outlined text-[20px]">
                    shopping_cart
                  </span>
                </span>
              )}
            </button>
          </div>
        </div>
        <span className="text-xs">
          A eleccion personal, para 2, 4, 6, 8, 10 personas
        </span>
      </div>
    </div>
  );
};

export default CardPicadas;
