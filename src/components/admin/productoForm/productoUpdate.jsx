import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import APIConsultas from "../../../services/consultas";
import ImageForm from "./imageForm";
import { useRouter } from "next/router";
import Head from "next/head";
const ProductoUpdate = (props) => {
  const [formulario, setFormulario] = useState({
    idpicada: "",
    ingredientes: "",
    nombre: "",
    precioxpers: "",
    visible: "",
    arrimagesIndiv: [],
    arrmedidasIndiv: [],
    arrcolor: [],
  });
  const [timer, setTimer] = useState(null);
  const [titlePage, setTitlePage] = useState("");
  const router = useRouter();
  useEffect(() => {
    setTitlePage(`${formulario.nombre} | ${props.appName}`);
  }, [formulario.nombre, props.appName]);
  useEffect(() => {
    APIConsultas.picadas.GET_XID(props.idPage, true).then((data_prod) => {
      if (!data_prod) return router.push("/admin");
      setFormulario({
        idpicada: data_prod.idpicada,
        ingredientes: data_prod.ingredientes,
        nombre: data_prod.nombre,
        precioxpers: data_prod.precioxpers,
        visible: data_prod.visible,
        arrimagesIndiv: [],
        arrmedidasIndiv: data_prod.arrmedidasIndiv,
        arrcolor: data_prod.arrcolor,
      });
      APIConsultas.Images.SET_IMAGE(data_prod).then((imgs) => {
        setFormulario((form) => ({ ...form, arrimagesIndiv: imgs }));
      });
    });
  }, [props.idPage, router]);

  const setValue = async (ev, name, value) => {
    ev?.preventDefault();
    let prods = [];
    updateData(name, value);
    if (name === "typeCatalog") {
      switch (value) {
        case 0:
          setFormulario({
            ...formulario,
            arrimagesIndiv: await APIConsultas.Images.SET_IMAGE(formulario),
            [name]: value,
            visible: ctrlVisible(name, value),
          });
          break;
        case 1:
          prods = await APIConsultas.Images.SET_ARRCOLOR(formulario);
          setFormulario({
            ...prods,
            [name]: value,
            visible: ctrlVisible(name, value),
          });
          break;
      }
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name !== "visible") {
      setFormulario({
        ...formulario,
        [e.target.name]: e.target.value,
        visible: ctrlVisible(e.target.name, e.target.value),
      });
    } else {
      let val = e.target.value;
      if (val === 0) val = ctrlVisible(e.target.name, e.target.value);
      setFormulario({
        ...formulario,
        visible: val,
      });
    }

    if (
      e.target.name !== "arrcolor" &&
      e.target.name !== "arrmedidasIndiv" &&
      e.target.name !== "arrimagesIndiv"
    ) {
      updateData(e.target.name, e.target.value);
    }
  };
  const updateData = (campo, valor) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        const res = await APIConsultas.picadas.UPDATE(
          formulario.idpicada,
          campo,
          valor
        );
        if (res) {
          if (campo !== "visible") {
            updateData("visible", ctrlVisible(campo, valor));
            return toast.success(`Dato actualizado!`, {
              autoClose: 1000,
            });
          }
          return;
        }
        return toast.error(`Error al modificar el campo.`);
      }, 1000)
    );
  };

  const infoUser = (ev, key, value) => {
    ev.preventDefault();
    let msg = "";
    let visible = 1;
    switch (key) {
      case "typeCatalog":
        if (value === 0) {
          msg = `Podrá cargar infintas imagenes,
          como asi tambien, seleccionar entre las medidas cargadas
          para mostrar en el catalogo al cliente.`;
        } else if (value === 1) {
          msg = `Podrá cargar infintos colores. Dentro de los mismos,
          cargar imagenes y seleccionar medidas para luego mostrar en el catalogo`;
        }
        break;
      case "prodVisible":
        visible = formulario.visible === 1 ? 0 : 1;
        if (ctrlVisible("visible", visible) === 1) {
          setFormulario({
            ...formulario,
            visible,
          });
          setValue(ev, "visible", visible);
          return;
        }
        msg = `Para poner el producto visible debe completar todos los datos obligatorios.`;
        break;
    }
    return toast.info(msg);
  };

  const ctrlVisible = (campo, valor) => {
    let ocultar = 1;

    if (
      campo === "categ" ||
      campo === "subc" ||
      campo === "marca" ||
      campo === "modelo" ||
      campo === "moneda" ||
      campo === "precioventa"
    ) {
      if (+valor <= 0 || valor.length === 0) {
        ocultar = 0;
      }
    } else if (campo === "typeCatalog") {
      if (valor === 1) {
        formulario.arrcolor?.forEach((c) => {
          if (
            c.nomcolor.length === 0 ||
            !c.arrmedidas ||
            c.arrmedidas.length === 0
          ) {
            ocultar = 0;
          }
        });
        if (formulario.arrcolor?.length === 0) {
          ocultar = 0;
        }
      } else {
        if (formulario.arrimagesIndiv.length === 0) {
          ocultar = 0;
        }
      }
    }
    ocultar = ctrlForm(ocultar, campo, valor);

    return ocultar;
  };

  const ctrlForm = (ocultar, campo, valor) => {
    if (
      formulario.nombre.length === 0 ||
      formulario.ingredientes.length === 0 ||
      formulario.precioxpers.length === 0
    ) {
      ocultar = 0;
    }
    if (campo !== "typeCatalog") {
      const arr = campo === "arrcolor" ? valor : formulario.arrcolor;
      if (formulario.typeCatalog === 1) {
        arr.forEach((c) => {
          if (
            c.nomcolor.length === 0 ||
            !c.arrmedidas ||
            c.arrmedidas.length === 0
          ) {
            ocultar = 0;
          }
        });
        if (formulario.arrcolor.length === 0) {
          ocultar = 0;
        }
      } else if (formulario.typeCatalog === 0) {
        if (campo !== "arrmedidasIndiv" && campo !== "arrimagesIndiv") {
          if (
            (!formulario.arrmedidasIndiv ||
              formulario.arrmedidasIndiv.length === 0) &&
            (!formulario.arrimagesIndiv ||
              formulario.arrimagesIndiv.length === 0)
          ) {
            ocultar = 0;
          }
        } else {
          if (valor.length === 0) {
            ocultar = 0;
          }
        }
      }
    }
    if (
      campo === "arrcolor" ||
      campo === "arrmedidasIndiv" ||
      campo === "arrimagesIndiv"
    ) {
      updateData("visible", ocultar);
    }

    return ocultar;
  };

  return (
    <>
      <Head>
        <title>{titlePage}</title>
        <meta name="description" content={formulario.descripcion} />
        <link rel="icon" href="/media/logoPatio.png" />
      </Head>
      <form className="bg-gray-200 h-screen pt-24 p-8 fullScroll">
        <div className="bg-white rounded-lg shadow-xl w-full  p-4">
          <div className="flex justify-start mb-4 ">
            <div className="flex">
              <h1 className="text-secondary-500 font-bold md:text-xl  uppercase font-commuter">
                Ficha de articulo
              </h1>
            </div>
          </div>

          <div className="block md:flex gap-4">
            <div className="cont-inps w-full">
              <div className="flex flex-col gap-3 w-full">
                <div className="grid grid-cols-1 mr-3 w-full">
                  <label
                    className="uppercase text-sm text-black font-bold text-light md:text-sm "
                    htmlFor="nombre"
                  >
                    Retira nombre
                    <abbr
                      className="text-red-400 pl-1"
                      title="Dato obligatorio"
                    >
                      *
                    </abbr>
                  </label>
                  <input
                    className="px-3 h-10 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600 "
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
                    <abbr
                      className="text-red-400 pl-1"
                      title="Dato obligatorio"
                    >
                      *
                    </abbr>
                  </label>
                  <textarea
                    className="px-3 h-[170px] rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600"
                    id="ingredientes"
                    name="ingredientes"
                    value={formulario.ingredientes}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1  w-full">
                  <label
                    className="uppercase text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="precioxpers"
                  >
                    Precio por persona
                    <abbr
                      className="text-red-400 pl-1"
                      title="Dato obligatorio"
                    >
                      *
                    </abbr>
                  </label>
                  <input
                    className="px-3 h-10 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600"
                    id="precioxpers"
                    name="precioxpers"
                    value={formulario.precioxpers}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="cont-imgs w-full md:mt-0 my-4 flex flex-col gap-[6.4px]">
              <div className="flex gap-4 drop-shadow-lg mt-6">
                <div className="flex items-center justify-between w-full ">
                  <div
                    className={`uppercase h-10  px-4 text-sm
                               font-bold text-light rounded-xl
                                md:text-sm flex items-center justify-between gap-4
                              w-full shadow transition-all border-2 border-primary-500 bg-primary-500 text-white}`}
                  >
                    <span
                      onClick={(ev) => setValue(ev, "typeCatalog", 0)}
                      aria-hidden
                      className="h-full w-full flex items-center justify-center cursor-pointer text-white"
                    >
                      Imagenes y medidas
                    </span>
                    <span
                      aria-hidden
                      onClick={(ev) => infoUser(ev, "typeCatalog", 0)}
                      className="material-icons-outlined cursor-pointer text-white"
                      title="Clickea y mira la informacion!"
                    >
                      contact_support
                    </span>
                  </div>
                </div>
              </div>

              <ImageForm
                {...props}
                formulario={formulario}
                setUpdate={(data) => onChange(data)}
              />
            </div>
          </div>
          <div className="flex items-center justify-start md:gap-8 gap-4 pt-4">
            <div className="flex items-center justify-between w-full max-w-xs ">
              <div
                className={`uppercase h-10  px-4 text-sm
                    font-bold text-light rounded-xl
                   md:text-sm flex items-center justify-between gap-4
                   w-full shadow ${
                     formulario.visible === 1
                       ? "bg-green-500 text-white"
                       : "bg-red-400 text-white"
                   }`}
                onClick={(ev) => infoUser(ev, "prodVisible", 1)}
                aria-hidden
              >
                <div
                  aria-hidden
                  className="h-full w-full flex items-center cursor-pointer justify-center"
                >
                  {formulario.visible === 0 ? (
                    <span>Producto Visible</span>
                  ) : (
                    <span>Producto Oculto</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default ProductoUpdate;
