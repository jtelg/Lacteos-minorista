import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import APIConsultas from '../../../services/consultas';
import ModalView from '../../utils/modalView';
import { useSelector } from 'react-redux';
// import ServUsos from '../../../utils/usos.utils';
import SearchProducto from '../../client/utils/searchProducto';
import ProductoSelect from './productoSelect';

const tipoPago = [
  { idtipo: 1, nombre: 'Efectivo' },
  { idtipo: 2, nombre: 'Transferencia' },
  { idtipo: 3, nombre: 'Tarjeta' }
];
const tipoEntrega = [
  { idtipo: '1', nombre: 'Retiro del local' },
  { idtipo: '2', nombre: 'Envio a domicilio' }
];

const VentaInsert = (props) => {
  const [productos, setProductos] = useState([]);
  const globalVars = useSelector((s) => s.globalVars);
  const [userVars, setUserVars] = useState({
    direccion: '',
    telefono: ''
  });

  const [tipoSelect, setTipoSelect] = useState({
    pago: 0,
    entrega: 0
  });
  const dateNowUse = new Date();
  const [formulario, setFormulario] = useState({
    nombre: '',
    telefono: '',
    tipoentrega: 'Retiro del local',
    fecha: `${dateNowUse.getHours()}:${dateNowUse.getMinutes()}`,
    tipopago: 'Efectivo',
    comentario: '',
    direccion: ''
  });
  const router = useRouter();

  useEffect(() => {
    if (globalVars) {
      setUserVars({
        telefono: globalVars[0].valor,
        direccion: globalVars[3].valor
      });
    }
  }, [globalVars]);

  const Entrega = (e, i, uso) => {
    e.preventDefault();
    if (uso === 'tipoPago') {
      setTipoSelect({
        ...tipoSelect,
        pago: i
      });
    } else if (uso === 'tipoEntrega') {
      setTipoSelect({
        ...tipoSelect,
        entrega: i
      });
    }
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'productos') {
      return clickBandera(null, true);
    }
    setFormulario({
      ...formulario,
      [name]: value
    });
  };
  const clickBandera = (ev, value) => {
    ev?.preventDefault();
  };

  const venta_add = () => {
    const total = productos?.reduce(
      (a, b) => a + b.precioxpers * b.cantidadForm,
      0
    );
    const venta = {
      iduser: 0,
      CP: '5900',
      destino_calle: null,
      destino_nro: null,
      destino_dpto: null,
      destino_barrio: null,
      destino_ciudad: formulario.direccion,
      tel_form: formulario.telefono,
      tipo_alta: 'Web',
      entrega: formulario.tipoentrega,
      otra_persona: 0,
      retira_nombre: formulario.nombre,
      retira_apellido: null,
      montototal: total,
      tipo_pago: formulario.tipopago,
      seguimiento_idestado: 2,
      estado: 'Pendiente',
      anulado_porque: null,
      fec_anulado: null
    };
    return venta;
  };
  const enviarPedido = async (ev) => {
    ev.preventDefault();
    try {
      const venta = venta_add();
      await APIConsultas.ventas.VENTAS_ADD(venta, productos, formulario);
      closeModal();
      router.push('/admin');
    } catch (error) {
      console.error('alta de venta ', error);
    }
  };

  const closeModal = (ev) => {
    ev?.preventDefault();
    props.close(false);
    router.push('/admin');
  };
  const retProductos = (ev) => {
    setProductos(ev);
  };

  return (
    <>
      <ModalView
        open={props.open}
        titulo="Nueva Venta"
        close={() => closeModal()}
        className="w-full"
      >
        <article className="h-full flex w-full min-w-[820px] gap-4">
          <form
            className="fullScroll rounded max-w-[460px] w-full"
            id="formProd"
            onSubmit={(e) => enviarPedido(e)}
          >
            <div className="cont-inps w-full">
              <div className="flex w-full">
                <div className="grid grid-cols-1 mr-3 w-[50%]">
                  <label
                    className="uppercase text-sm text-black font-bold text-light md:text-sm "
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    className="px-3 h-10 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600 "
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={onChange}
                    required={true}
                  />
                </div>
                <div className="grid grid-cols-1 w-[50%]">
                  <label
                    className="uppercase text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="telefono"
                  >
                    Telefono
                  </label>
                  <input
                    className="px-3 h-10 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                    id="telefono"
                    name="telefono"
                    value={formulario.telefono}
                    onChange={onChange}
                    required={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 mr-3 w-full mt-2">
                <label
                  className="text-sm text-black font-bold text-light"
                  htmlFor="tipopago"
                >
                  TIPO DE PAGO
                </label>
                <div className="flex gap-3 pt-[0.3rem]">
                  {tipoPago.map((tipo, index) => (
                    <button
                      key={index}
                      onClick={(e) => Entrega(e, index, 'tipoPago')}
                      value={tipo.nombre}
                      name="tipopago"
                      id="tipopago"
                      className={`text-[12px] py-[.4rem] font-semibold border-2  border-primary-500 rounded-xl cursor-pointer w-full ${
                        tipoSelect.pago === index
                          ? 'bg-green-800 text-white border-green-800'
                          : ''
                      }`}
                    >
                      {tipo.nombre}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 mr-3 w-full mt-2">
                <label
                  className="text-sm text-black font-bold text-light"
                  htmlFor="tipoentrega"
                >
                  TIPO DE ENTREGA
                </label>
                <div className="flex gap-3 pt-[0.3rem]">
                  {tipoEntrega.map((tipo, index) => (
                    <button
                      key={index}
                      onClick={(e) => Entrega(e, index, 'tipoEntrega')}
                      value={tipo.nombre}
                      name="tipoentrega"
                      id="tipoentrega"
                      className={`text-[12px] py-[.4rem] font-semibold border-2  border-primary-500 rounded-xl cursor-pointer w-full ${
                        tipoSelect.entrega === index
                          ? 'bg-green-800 text-white border-green-800'
                          : ''
                      }`}
                    >
                      {tipo.nombre}
                    </button>
                  ))}
                </div>
              </div>
              {formulario.tipoentrega === 'Envio a domicilio' && (
                <div className="grid grid-cols-1 mr-3 w-full">
                  <label
                    className="text-sm text-black font-bold text-light mt-2"
                    htmlFor="direccion"
                  >
                    DIRECCION
                    <abbr className="text-red-400 pl-1" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    className="px-3 h-10 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600 "
                    onChange={onChange}
                    name="direccion"
                    id="direccion"
                    type="text"
                    placeholder={userVars.direccion}
                    required={true}
                  />
                </div>
              )}
              <div className="flex mt-5 w-full">
                <div className="grid grid-cols-1 w-full">
                  <label
                    className="uppercase text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="fecha"
                  >
                    FECHA
                  </label>
                  <input
                    className="px-3 h-10 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                    type="time"
                    placeholder=""
                    id="fecha"
                    name="fecha"
                    value={formulario.fecha}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="flex mt-5 w-full">
                <div className="grid grid-cols-1 w-full ">
                  <label
                    className="uppercase text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="comentario"
                  >
                    COMENTARIO
                  </label>
                  <textarea
                    className="px-3 h-20 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                    type="text"
                    placeholder="Deja un comentario"
                    id="comentario"
                    name="comentario"
                    value={formulario.comentario}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end gap-4 my-4">
              <input
                type="submit"
                className="w-full bg-primary-500 rounded-lg shadow-xl font-bold text-white px-4 py-2 hover:bg-primary-500 cursor-pointer"
                value="Confirmar"
              />
            </div>
          </form>
          <div className="w-full">
            <SearchProducto
              productos={productos}
              setProductos={(data) => {
                retProductos(data);
              }}
            />
            <ProductoSelect productos={productos} />
          </div>
        </article>
      </ModalView>
    </>
  );
};
export default VentaInsert;
