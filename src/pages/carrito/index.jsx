import React, { useState, useEffect } from 'react';
import TablaPedidos from '../../components/client/page/shop/carrito/tablaPedidos';
import { useSelector } from 'react-redux';
import ModalEnviar from '../../components/client/page/shop/carrito/modalEnviar';
import Head from 'next/head';

const Carrito = () => {
  const [pedidos, setPedidos] = useState([]);
  const [total, setTotal] = useState(0);
  const arr_pedidos = useSelector((s) => s.carrito);

  useEffect(() => {
    setPedidos(arr_pedidos);
    setTotal(
      arr_pedidos
        ?.reduce((a, b) => a + b.precioxpers * b.cantidadForm, 0)
        .toLocaleString('de')
    );
  }, [arr_pedidos]);

  return (
    <>
      <Head>
        <title>Lacteos Premium S.A | Carrito</title>
        <meta
          name="description"
          content="Tienda comercial de carnes de campo"
        />
        <link rel="icon" href="/icon-192x192.png" />
      </Head>
      <div className="pt-[100px]  md:px-[8rem] px-8">
        <div className="w-full text-center">
          <h2 className="md:text-[50px] text-[30px] brother-800">Carrito</h2>
        </div>
        <div>
          <div
            className={`w-full flex flex-col justify-between p-4  bg-[#FAFAFA] rounded-[30px]   shadow-[0_2px_5px_rgba(0,0,0,30%)] `}
          >
            <TablaPedidos pedidos={pedidos}></TablaPedidos>
            <div className="flex justify-between items-center py-2  px-4 ">
              <p className="w-[45%] brother-700 text-primary-500">
                El total del carrito es una aproximación, una vez armado el
                pedido, te enviaremos el peso y precio correspondiente.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl  brother-800 text-primary-600">
                    TOTAL: <span className="text-secondary">${total}</span>
                  </h1>
                </div>
                <ModalEnviar pedidos={pedidos}></ModalEnviar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
