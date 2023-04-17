import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DELETE_CART } from "../../../redux/actions";

const TablaPedidos = ({ pedidos }) => {
  const dispatch = useDispatch();

  const [arr_pedidos, setArr_pedidos] = useState(pedidos);

  useEffect(() => {
    setArr_pedidos(pedidos);
  }, [pedidos]);

  const eliminarCart = (id) => {
    dispatch(DELETE_CART(id));
  };

  return (
    <div>
      <ul className="w-full flex justify-between brother-800 text-primary-600 border-b-2">
        <li className="w-[25%] text-center">ID</li>
        <li className="w-[25%] text-center">NOMBRE</li>
        <li className="w-[25%] text-center">CANTIDADES</li>
        <li className="w-[25%] text-center">ACCIONES</li>
      </ul>
      {arr_pedidos.length > 0 ? (
        arr_pedidos.map((pedido) => (
          <ul
            key={pedido.idpicada}
            className="flex justify-between border-b py-4 brother-700"
          >
            <li className="w-[25%] text-center">{pedido.idpicada}</li>
            <li className="w-[25%] text-center">
              Picada <span className="text-secondary">{pedido.nombre}</span>
            </li>
            <li className="w-[25%] text-center">
              {pedido.personas}{" "}
              <span className="text-secondary">personas </span>
            </li>
            <li className="w-[25%] text-center">
              <button onClick={() => eliminarCart(pedido.idpicada)}>
                <i className="bx bxs-trash text-2xl text-red-700"></i>
              </button>
            </li>
          </ul>
        ))
      ) : (
        <div className="py-8 px-4 border-b">
          <span className="font-bold">El carrito de compras está vacío.</span>
        </div>
      )}
    </div>
  );
};

export default TablaPedidos;
