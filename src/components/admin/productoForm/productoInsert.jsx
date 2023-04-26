import { useRouter } from 'next/router';
import { useState } from 'react';
import APIConsultas from '../../../services/consultas';
import ServUsos from '../../../utils/usos';
import ModalView from '../../utils/modalView';

const ProductoUpdate = (props) => {
  const [formulario, setFormulario] = useState({
    idpicada: '',
    ingredientes: '',
    nombre: '',
    precioxpers: ''
  });
  const router = useRouter();

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const insertProducto = async (e) => {
    e.preventDefault();
    console.log(formulario);
    const re = await APIConsultas.picadas.ADD(formulario);
    if (re) {
      router.push(
        `admin/producto/${ServUsos.convertUrl(formulario.modelo, 'convert')}`
      );
      closeModal(null);
    }
  };
  const closeModal = (ev) => {
    ev?.preventDefault();
    props.close(false);
    router.push('/admin');
  };
  return (
    <>
      <ModalView
        open={props.open}
        titulo="Alta de producto"
        close={() => closeModal()}
      >
        <article className="h-full">
          <form
            className="fullScroll rounded lg:w-[450px] w-full "
            id="formProd"
            onSubmit={(e) => insertProducto(e)}
          >
            <div className="cont-inps w-full">
              <div className="flex flex-col w-full gap-2 ">
                <div className="grid grid-cols-1  ">
                  <label
                    className="uppercase text-sm text-black font-bold  md:text-sm "
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    className="px-3 h-10 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={onChange}
                  />
                </div>
                <div className="grid grid-cols-1 mr-3 w-full">
                  <label
                    className="uppercase text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="ingredientes"
                  >
                    Ingredientes
                    <abbr className="text-red-400 pl-1" title="required">
                      *
                    </abbr>
                  </label>
                  <textarea
                    type="text"
                    className="px-3 h-[150px] py-1 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                    id="ingredientes"
                    name="ingredientes"
                    value={formulario.ingredientes}
                    onChange={onChange}
                    required={true}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1  w-full">
                  <label
                    className="uppercase text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="precioxpers"
                  >
                    Precio por persona
                  </label>
                  <input
                    type="number"
                    className="px-3 h-10 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                    id="precioxpers"
                    name="precioxpers"
                    value={formulario.precioxpers}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end gap-4 my-4">
              <input
                type="submit"
                className="w-[50%] bg-primary-500 rounded-lg shadow-xl font-bold text-white px-4 py-2 hover:bg-primary-500 cursor-pointer"
                value="Confirmar"
              />
            </div>
          </form>
        </article>
      </ModalView>
    </>
  );
};
export default ProductoUpdate;
