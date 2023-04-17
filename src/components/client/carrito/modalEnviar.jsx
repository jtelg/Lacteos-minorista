import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import APIConsultas from "../../../services/consultas";
import { useDispatch } from "react-redux";
import { CARRITO_DELETE_ALL } from "../../../redux/actions";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalEnviar = ({ pedidos }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlerChange = (e) => {
    e.preventDefault();
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };
  const venta_add = () => {
    // const total = pedidos.reduce(
    //   (a, b) => a + b.precioventa * b.cantidadForm,
    //   0
    // );
    const venta = {
      iduser: 0,
      CP: "5900",
      destino_calle: null,
      destino_nro: null,
      destino_dpto: null,
      destino_barrio: null,
      destino_ciudad: null,
      tel_form: formulario.telefono,
      tipo_alta: "Web",
      entrega: "Retira",
      otra_persona: 0,
      retira_nombre: formulario.nombre,
      retira_apellido: null,
      montototal: 0,
      tipo_pago: "Efectivo",
      seguimiento_idestado: 1,
      comentario: "",
      estado: "No Visible",
      anulado_porque: null,
      fec_anulado: null,
    };
    return venta;
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (formulario.nombre && formulario.email) {
      try {
        Swal.fire({
          icon: "success",
          title: "¡Realizando Compra!",
          showConfirmButton: false,
        });
        const obj = venta_add();
        const re = await APIConsultas.ventas.VENTAS_ADD(obj, pedidos);
        // senderFRONT.enviaPedido(
        //   globalVars[0].valor,
        //   entrega,
        //   arr_cartprods,
        //   re.insertId
        // );
        dispatch(CARRITO_DELETE_ALL());
        Swal.close();
        handleClose();
        router.push("/picadas");
      } catch (error) {
        console.error("alta de venta ", error);
      }
    } else {
      Swal.fire("Revisar datos obligatorios!");
    }
  };
  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-primary-500 text-white px-4 py-2 text-xl rounded-lg hover:shadow-[0_2px_5px_rgba(0,0,0,0.1)] shadow-[0_2px_5px_rgba(0,0,0,30%)] "
      >
        Enviar pedido
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        className="rounded-lg z-[1]"
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="brother-800 text-2xl text-center text-primary-500 uppercase"
            >
              Formulario envio
            </Typography>
            <div className="mt-2">
              <form
                onSubmit={handlerSubmit}
                className="flex flex-col w-full gap-3"
              >
                <label className="flex flex-col text-sm brother-700 ">
                  Nombre
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="py-1 px-1 rounded-lg border-[#CACACA] border-2 "
                    onChange={handlerChange}
                    name="nombre"
                    value={formulario.nombre}
                  />
                </label>
                <label className="flex flex-col text-sm brother-700">
                  Email
                  <input
                    type="text"
                    placeholder="Ejemplo@gmail.com"
                    className="py-1 px-1 rounded-lg border-[#CACACA] border-2"
                    onChange={handlerChange}
                    name="email"
                    value={formulario.email}
                  />
                </label>
                <label className="flex flex-col text-sm brother-700">
                  Telefono
                  <input
                    type="number"
                    placeholder="3535416882"
                    className="py-1 px-1 rounded-lg border-[#CACACA] border-2"
                    onChange={handlerChange}
                    name="telefono"
                    value={formulario.telefono}
                  />
                </label>

                <input
                  type="submit"
                  value="Enviar pedido"
                  className="bg-primary-500 text-white px-4 py-1  rounded-lg hover:shadow-[0_2px_5px_rgba(0,0,0,0.1)] shadow-[0_2px_5px_rgba(0,0,0,30%)] cursor-pointer"
                />
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalEnviar;
