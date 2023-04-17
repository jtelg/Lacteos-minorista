const APIConsultas = {
  picadas: {
    GET: async () => {
      const url = `/api/picadas?path=PICADAS_GET_LIST`;
      const resprod = await fetch(url);
      let dataprod = null;
      if (resprod.ok) {
        dataprod = await resprod.json();
        return dataprod;
      }
    },
  },
  ventas: {
    VENTAS_ADD: async (venta, arrProd) => {
      const data = {
        venta: venta,
        arrProd: arrProd,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const url = `/api/venta/?path=VENTA_ADD`;
      const re = await fetch(url, options);
      if (re.ok) {
        const resp = await re.json();
        return resp;
      }
      return false;
    },
  },
};

export default APIConsultas;
