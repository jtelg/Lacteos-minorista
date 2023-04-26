import { useEffect, useState } from 'react';

import SelectorCategory from './selector/selector';

import APIConsultas from '../../../services/consultas';
import SelectorIndexCaja from './selector/selectorIndexCaja';

import { useRouter } from 'next/router';
import ButtonInsert from './buttonInsert';
import selectorColumns from './selector/columnsSelector';
import VentaColumnConfig from './columns/caja/columnsOrder';
import ProductoColumnConfig from './columns/productos';
import UsuarioColumnsConfig from './columns/usuarios/usuarios';
import { useDispatch, useSelector } from 'react-redux';
import { RELOAD_TABLERO } from '../../../redux/actions';
import GridConfig from './gridConfig';

const Tablero = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const reloadTablero = useSelector((s) => s.reloadTablero);

  const [arrEgresos, setArrEgresos] = useState([]);
  const [col_use, setCol_use] = useState([]);
  const [arr_use, setArr_use] = useState([]);
  const initialCaja = { titulo: `Caja Abierta`, idcaja: 0 };
  const [cajaAbierta, setCajaAbierta] = useState(initialCaja);
  const [loadingTablero, setLoadingTablero] = useState(true);
  const [obj_use, setobj_use] = useState({
    text_use: '',
    indrow: '',
    ind_use: 0,
    buttonTitle: ''
  });
  const [indexSelectorCaja, setIndexSelectorCaja] = useState(0);
  const { columns_venta } = VentaColumnConfig();
  const { columns_prods } = ProductoColumnConfig(router);
  const { columns_user } = UsuarioColumnsConfig();
  const selectorColumnsGrid = {
    ordenes: columns_venta,
    productos: columns_prods,
    clientes: columns_user,
    ingresos: columns_venta
  };

  const selectorCateg = {
    ordenes: selectorColumns.ordenCol,
    productos: selectorColumns.prodCol,
    clientes: selectorColumns.cliCol,
    ingresos: selectorColumns.ordenCol
  };
  const selectorCaja = {
    ordenes: 0,
    productos: 0,
    clientes: 0,
    ingresos: 0
  };

  const fetchArrUseSelector = {
    ordenes: (idcaja) => {
      return APIConsultas.ventas.GET_ALL(idcaja || 0, 0);
    },
    productos: () => {
      return APIConsultas.picadas.GET();
    },
    clientes: () => {
      return APIConsultas.usuario.GET_LIST();
    },
    ingresos: (idcaja) => {
      return APIConsultas.ventas.GET_ALL(idcaja || 0, true, 0);
    }
  };

  useEffect(() => {
    if (!props.idcajaURL) {
      setLoadingTablero(true);
      setCol_use(selectorColumnsGrid[props.selector]);
      setobj_use(selectorCateg[props.selector]);
      setIndexSelectorCaja(selectorCaja[props.selector]);
      fetchArrUseSelector[props.selector](null).then((data) => {
        setLoadingTablero(false);
        setArr_use(data);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selector, props.idcajaURL]);

  useEffect(() => {
    const fetchDataCaja = async () => {
      let re = await APIConsultas.caja.GET_TODO();
      if (!re) re = [];
      const cajaSelected = re.find((e) => e.idcaja === +props.idcajaURL);
      setCajaAbierta(cajaSelected || initialCaja);
      fetchDataEgreso(props.idcajaURL ? props.idcajaURL : 0);
      setCol_use(selectorColumnsGrid[props.selector]);
      setobj_use(selectorCateg[props.selector]);
      setIndexSelectorCaja(selectorCaja[props.selector]);
      fetchArrUseSelector[props.selector](props.idcajaURL).then((data) => {
        setLoadingTablero(false);
        setArr_use(data);
      });
    };
    const fetchDataEgreso = async (idcaja) => {
      const arrEgresos = await APIConsultas.caja.EGRESO_GET_XCAJA(idcaja);
      setArrEgresos(arrEgresos);
    };

    if (
      props.selector === 'ingresos' ||
      props.selector === 'ordenes' ||
      props.selector === 'egresos'
    ) {
      fetchDataCaja(props.idcajaURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idcajaURL, props.selector]);

  useEffect(() => {
    const fetchDataVenta = async () => {
      setLoadingTablero(true);
      setCol_use(selectorColumnsGrid.ingresos);
      setobj_use(selectorCateg.ingresos);
      setIndexSelectorCaja(selectorCaja.ingresos);
      fetchArrUseSelector.ingresos(null).then((data) => {
        setLoadingTablero(false);
        setArr_use(data);
      });
      window.history.pushState(null, '', '/admin?s=orden&sc=ingreso');
      dispatch(RELOAD_TABLERO(false));
    };
    if (reloadTablero) {
      fetchDataVenta();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadTablero]);

  const controlAgregaNuevo = () => {
    const bndReturn = true;
    return bndReturn;
  };
  return (
    <>
      <SelectorCategory {...props} obj_use={obj_use} loading={loadingTablero} />
      {obj_use.ind_use === 0 && (
        <SelectorIndexCaja
          {...props}
          dataCaja={cajaAbierta}
          arrEgresos={arrEgresos}
          router={router}
          text_use={obj_use.text_use}
          indexSelect={indexSelectorCaja}
          arr_use={arr_use}
          loading={loadingTablero}
        />
      )}
      <div className=" pb-12 min-h-[85vh] fullScroll">
        <article className="w-full px-4">
          <div className="flex flex-col gap-4 justify-center px-5 py-6 shadow-sm rounded-lg bg-primary-500">
            <div className="flex justify-between">
              <div className="flex gap-6">
                <h3 className="text-white text-lg uppercase text-left font-bold">
                  {obj_use.text_use}
                </h3>
              </div>
              {controlAgregaNuevo() && (
                <ButtonInsert
                  obj_use={obj_use}
                  use={props.use}
                  router={router}
                />
              )}
            </div>
            <GridConfig
              {...props}
              col_use={col_use}
              arr_use={arr_use}
              obj_use={obj_use}
              loading={loadingTablero}
            />
          </div>
        </article>
      </div>
    </>
  );
};

export default Tablero;
