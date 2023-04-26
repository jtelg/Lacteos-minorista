import React from 'react';
import Head from 'next/head';
import ListProducts from '../../components/client/page/shop/listProducts';

const Picadas = () => {
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
        <ListProducts></ListProducts>
      </div>
    </>
  );
};

export default Picadas;
