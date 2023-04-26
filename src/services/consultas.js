import { GLOBAL_VARS, ADD_CARD } from '../redux/actions';
import localStorage from '../utils/localstorage';
import axios from 'axios';
const APIConsultas = {
  picadas: {
    ADD: async (producto) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      };
      const url = `/api/picadas/?path=PICADAS_ADD`;
      const re = await fetch(url, options);
      if (re.ok) return await re.json();
      return false;
    },
    GET: async () => {
      const url = `/api/picadas?path=PICADAS_GET_LIST`;
      const resprod = await fetch(url);
      let dataprod = null;
      if (resprod.ok) {
        dataprod = await resprod.json();
        return dataprod;
      }
    },
    GET_XID: async (idpicada, local) => {
      let baseUrl = process.env.NEXTAUTH_URL;
      if (local) baseUrl = '';
      const url = `${baseUrl}/api/picadas/${idpicada}/?path=PICADA_GET_XID`;
      const resprod = await fetch(url);
      let dataprod = null;
      if (resprod.ok) {
        dataprod = await resprod.json();
        return dataprod[0];
      }
    },
    UPDATE: async (idpicada, campo, valor) => {
      const data = {
        campo,
        valor
      };
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const url = `/api/picadas/${idpicada}?path=PICADA_UPDATE`;
      const updres = await fetch(url, options);
      if (updres.ok) {
        return true;
      }
      return false;
    }
  },
  ventas: {
    VENTAS_ADD: async (venta, arrProd) => {
      const data = {
        venta: venta,
        arrProd: arrProd
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const url = `/api/venta/?path=VENTA_ADD`;
      const re = await fetch(url, options);
      if (re.ok) {
        const resp = await re.json();
        return resp;
      }
      return false;
    },
    GET_ALL: async (idcaja, local, bnd = 0) => {
      let baseUrl = process.env.NEXTAUTH_URL;
      if (local) baseUrl = '';
      const url = `${baseUrl}/api/venta?path=VENTA_GET_LIST&idcaja=${idcaja}&bnd=${bnd}`;

      const res = await fetch(url);
      let data = null;
      if (res.ok) {
        data = await res.json();
        return data;
      }
    },
    GET_XID: async (idventa, local) => {
      let baseUrl = process.env.NEXTAUTH_URL;
      if (local) baseUrl = '';
      const url = `${baseUrl}/api/venta?path=VENTA_GET_XID&id=${idventa}`;
      const resprod = await fetch(url);
      let dataprod = null;
      if (resprod.ok) {
        dataprod = await resprod.json();
        return dataprod;
      }
    },
    UPDATE_SEGUIMIENTO: async (data, local) => {
      let baseUrl = process.env.NEXTAUTH_URL;

      if (local) baseUrl = '';
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const url = `${baseUrl}/api/venta?path=UPDATE_SEGUIMIENTO`;
      const updres = await fetch(url, options);
      if (updres.ok) {
        return true;
      }
      return false;
    },
    UPDATE_XCAMPO: async (data, local) => {
      let baseUrl = process.env.NEXTAUTH_URL;
      if (local) baseUrl = '';
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const url = `${baseUrl}/api/venta?path=UPDATE_XCAMPO`;
      const updres = await fetch(url, options);
      if (updres.ok) {
        return true;
      }
      return false;
    },
    GET_PRODS_XID: async (idventa) => {
      const url = `/api/venta?path=VENTA_GET_PROD_XID&id=${idventa}`;
      const resprod = await fetch(url);
      let dataprod = null;
      if (resprod.ok) {
        dataprod = await resprod.json();
        for (const prod of dataprod) {
          if (prod.typeCatalog === 0) {
            const imgs = await APIConsultas.Images.SET_IMAGE(prod);
            prod.images = imgs;
          } else {
            const resimg = await APIConsultas.Images.SET_ARRCOLOR(prod);
            const images = resimg.arrcolor?.reduce(
              (a, b) => a + b.arrimages,
              ''
            );
            prod.images = images;
          }
        }

        return dataprod;
      }
    },
    UPDATE_ESTADO: async (data, local) => {
      let baseUrl = process.env.NEXTAUTH_URL;
      if (local) baseUrl = '';
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const url = `${baseUrl}/api/venta?path=UPDATE_ESTADO`;
      const updres = await fetch(url, options);
      if (updres.ok) {
        return true;
      }
      return false;
    },
    VENTA_RELOAD: async (local) => {
      // const url = `${baseUrl}/api/pusher?path=VENTA_RELOAD`;
      const url = `${process.env.NEXT_PUBLIC_URL_BOT_API}/api/ventas/reloadDashboard`;
      const resprod = await fetch(url);
      let dataprod = null;
      if (resprod.ok) {
        dataprod = await resprod.json();
        return dataprod;
      }
    }
  },
  caja: {
    ADD: async (data) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const url = `/api/caja/?path=CAJA_ADD`;
      const re = await fetch(url, options);
      if (re.ok) return true;
      return false;
    },
    GET_TODO: async () => {
      const repscateg = await fetch(`/api/caja/?path=CAJA_GET_TODO`);
      let datacateg = null;
      if (repscateg.ok) {
        const arr = await repscateg.json();
        if (arr.length > 0) {
          arr.forEach((e) => {
            e.arrventas = JSON.parse(e.arrventas);
            e.arrEgresos = JSON.parse(e.arrEgresos);
            e.arrventas.forEach((venta) => {
              venta.arrProductos = JSON.parse(venta.arrProductos);
            });
            // e.arrventas.arrProductos = JSON.parse(e.arrventas.arrProductos);
          });
        }
        datacateg = arr;
      }
      return datacateg;
    },
    GET_REPORTE_XID: async (idcaja) => {
      const respReporte = await fetch(
        `/api/caja/?path=GET_REPORTE_XID&idcaja=${idcaja}`
      );
      let dataReporte = null;
      if (respReporte.ok) {
        dataReporte = await respReporte.json();
      }
      return dataReporte;
    },
    EGRESO_ADD: async (data) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const url = `/api/caja/?path=EGRESO_ADD`;
      const re = await fetch(url, options);
      if (re.ok) return true;
      return false;
    },
    EGRESO_GET_XCAJA: async (idcaja) => {
      const respegreso = await fetch(
        `/api/caja/?path=EGRESO_GET_XCAJA&idcaja=${idcaja}`
      );
      let dataEgreso = null;
      if (respegreso.ok) {
        dataEgreso = await respegreso.json();
      }
      return dataEgreso;
    }
  },
  variables: {
    GET: async () => {
      const url = `/api/user?path=VARIABLES_GET`;
      const resprod = await fetch(url);
      let dataprod = null;
      if (resprod.ok) {
        dataprod = await resprod.json();
        return dataprod;
      }
    },
    UPDATE: async (campo, nombre, valor) => {
      const data = {
        nombre,
        valor,
        campo
      };
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const url = `/api/user?path=SP_variables_put`;
      const updres = await fetch(url, options);
      if (updres.ok) {
        return true;
      }
      return false;
    }
  },
  usuario: {
    GlobalInfoUser: (dispatch, local) => {
      APIConsultas.variables.GET().then((data) => {
        dispatch(GLOBAL_VARS(data));
      });
      const prods = localStorage.getFromStorage('arr_carro');
      if (!prods || prods.length === 0) return;
      prods.forEach((prod) => {
        dispatch(ADD_CARD(prod));
      });
    },
    session: async (usuario, password, local) => {
      let baseUrl = process.env.NEXTAUTH_URL;
      if (local) baseUrl = '';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, password })
      };
      const url = `${baseUrl}/api/user/login?path=USUARIO_LOGIN`;
      const re = await fetch(url, options);
      if (re.ok) {
        const user = await re.json();
        if (user.length === 0) return false;
        return user[0];
      }
      return false;
    },
    GET_LIST: async () => {
      const url = `/api/user?path=USUARIO_GET_LIST`;
      const re = await fetch(url);
      let redata = [];
      if (re.ok) {
        redata = await re.json();
      }
      return redata;
    }
  },
  color: {
    ADD: async (color) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(color)
      };
      const url = `/api/producto/${color.idart}?path=COLORXPROD_ADD`;
      const re = await fetch(url, options);
      if (re.ok) return await re.json();
      return false;
    },
    DELETE: async (color) => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(color)
      };
      const url = `/api/producto/${color.idart}?path=COLORXPROD_DELETE`;
      const re = await fetch(url, options);
      if (re.ok) return true;
      return false;
    },
    UPDATE: async (idart, idcolor, campo, valor) => {
      const data = {
        campo,
        valor
      };
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const url = `/api/producto/${idart}?path=COLOR_UPDATE&idcolor=${idcolor}`;
      const updres = await fetch(url, options);
      if (updres.ok) {
        return true;
      }
      return false;
    },
    ADD_IMAGE_PHP: async (path, file, filename) => {
      const objImg = {
        index: 'add_file',
        file,
        filename,
        path
      };
      const pathimg = `${process.env.NEXT_PUBLIC_URL_IMG_API}${process.env.NEXT_PUBLIC_URL_IMG_ACTION}`;
      // console.log(pathimg, objImg);
      return axios.post(pathimg, objImg);
    },
    DEL_IMAGE_PHP: async (fullpath) => {
      const objImg = {
        index: 'file_del',
        path: fullpath.split('.com.ar')[1]
      };
      const pathimg = `${process.env.NEXT_PUBLIC_URL_IMG_API}${process.env.NEXT_PUBLIC_URL_IMG_ACTION}`;
      return axios.post(pathimg, objImg);
    },
    DEL_IMAGE_PHP_TODO: async (color) => {
      const objImg = {
        index: 'folder_del',
        path: `${process.env.NEXT_PUBLIC_URL_IMG_GET}${color.idart}/idcolor-${color.idcolor}`
      };
      const pathimg = `${process.env.NEXT_PUBLIC_URL_IMG_API}${process.env.NEXT_PUBLIC_URL_IMG_ACTION}`;
      return axios.post(pathimg, objImg);
    },
    GET_IMAGE_PHP: async (path) => {
      const objImg = {
        index: 'file_get',
        path
      };
      const pathimg = `${process.env.NEXT_PUBLIC_URL_IMG_API}${process.env.NEXT_PUBLIC_URL_IMG_ACTION}`;
      return axios.post(pathimg, objImg);
    }
  },
  Images: {
    SET_IMAGE: async (prod) => {
      const path = `${process.env.NEXT_PUBLIC_URL_IMG_GET_PICADAS}${prod.idpicada}/images/`;
      const data = await APIConsultas.color.GET_IMAGE_PHP(path);
      if (data.data.result.length > 0) {
        const imgs = [];
        data.data.result.forEach((url) => {
          const corte = url.split('/');
          const path = `${process.env.NEXT_PUBLIC_URL_IMG_API}${process.env.NEXT_PUBLIC_URL_IMG_GET_PICADAS}`;
          imgs.push(`${path}/${corte[9]}/${corte[10]}/${corte[11]}`);
        });
        return imgs;
      }
      return [];
    },
    SET_ARRCOLOR: async (prod) => {
      if (prod.arrcolor) {
        for (const color of prod.arrcolor) {
          const path = `${process.env.NEXT_PUBLIC_URL_IMG_GET}${color.idart}/idcolor-${color.idcolor}/`;
          const data = await APIConsultas.color.GET_IMAGE_PHP(path);
          if (data.data.result.length > 0) {
            const imgs = [];
            data.data.result.forEach((url) => {
              const corte = url.split('/');
              const path = `${process.env.NEXT_PUBLIC_URL_IMG_API}${process.env.NEXT_PUBLIC_URL_IMG_GET}`;
              imgs.push(`${path}/${corte[9]}/${corte[10]}/${corte[11]}`);
            });
            color.arrimages = imgs;
          }
        }
      }
      return prod;
    }
  }
};

export default APIConsultas;
