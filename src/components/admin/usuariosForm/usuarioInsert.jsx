import React, { useState } from 'react';

import Swal from 'sweetalert2';

import axios from 'axios';

import ModalView from '../../utils/modalView';

const UsuarioInsert = ({ open, close, router }) => {
  const [usuario, setUsuario] = useState({
    role: '',
    nombre: '',
    pass: '',
    image: '',
    tipodoc: 1,
    numdoc: '',
    telefono: '',
    email: '',
    fecregistro: '',
    recibe_oferta: 0,
    tipoCliente: 'A'
  });

  const handlerChange = (e) => {
    e.preventDefault();
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (
      usuario.nombre.length > 0 &&
      usuario.pass.length > 0 &&
      usuario.numdoc.length > 0 &&
      usuario.telefono.length > 0 &&
      usuario.email.length > 0 &&
      usuario.tipoCliente.length > 0
    ) {
      const resp = await axios.post('/api/user/login?path=SAVE_USER', {
        usuario
      });
      if (resp.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          showConfirmButton: false,
          timer: 1500
        });
        setActualizar(true);
      }
      closeModal();
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Something went wrong!',
        showConfirmButton: false
      });
    }
  };

  const closeModal = (ev) => {
    ev?.preventDefault();
    close(false);
    router.push('/admin');
  };

  return (
    <>
      <ModalView
        open={open}
        titulo="Alta de usuario"
        close={() => closeModal()}
      >
        <article className="h-full">
          <form onSubmit={handlerSubmit} className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="flex text-primary-500 font-bold text-[15px]"
                htmlFor="nombre"
              >
                Rol
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <select
                name="role"
                id="role"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              >
                <option value="">-- Select -- </option>
                <option value="Admin">Admin</option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>
            <div>
              <label
                className="flex text-primary-500 font-bold text-[15px]"
                htmlFor="nombre"
              >
                Nombre
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>
            <div>
              <label
                className="flex  text-primary-500 font-bold text-[15px]"
                htmlFor="pass"
              >
                Password
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="pass"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>
            <div>
              <label
                className="flex  text-primary-500 font-bold text-[15px]"
                htmlFor="numdoc"
              >
                DNI
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>

              <input
                type="number"
                name="numdoc"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>
            <div>
              <label
                className="flex  text-primary-500 font-bold text-[15px]"
                htmlFor="telefono"
              >
                Telefono
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="telefono"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>
            <div>
              <label
                className="flex  text-primary-500 font-bold text-[15px]"
                htmlFor="email"
              >
                Email
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="email"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>

            <input
              type="submit"
              value="Crear usuario"
              className="col-span-2 text-white bg-primary-500 h-[40px] rounded-lg"
            />
          </form>
        </article>
      </ModalView>
    </>
  );
};

export default UsuarioInsert;
