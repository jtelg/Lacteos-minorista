import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import APIConsultas from '../../../services/consultas';
import { useRouter } from 'next/router';
const InputsVar = (props) => {
  const [variablesNew, setVariablesNew] = useState();
  const [timer, setTimer] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setVariablesNew(await APIConsultas.variables.GET());
    };
    fetchData().catch(console.error);
  }, []);
  const changeForm = (index) => (e) => {
    e.preventDefault();
    const newArr = variablesNew.map((item, i) => {
      if (index === i) {
        return { ...item, valor: e.target.value };
      } else {
        return item;
      }
    });
    setVariablesNew(newArr);
    updateData(e.target.name, e.target.value);
  };
  const updateData = (nombre, valor) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        const res = await APIConsultas.variables.UPDATE('valor', nombre, valor);
        setVariablesNew(variablesNew);
        if (res) return toast.success(`Campo actualizado con exito!`);
        return toast.error(`Error al modificar el campo.`);
      }, 800)
    );
  };
  return (
    <>
      <div className="px-4">
        <button onClick={() => router.push('/admin')}>
          <i
            className="bx bx-arrow-back text-[40px] text-secondary-500 cursor-pointer hover:text-secondary-700"
            title="Volver al tablero"
          ></i>
        </button>
      </div>
      <hr className="w-full my-4 h-2"></hr>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-4 w-full px-4">
        {variablesNew?.map((el, index) => (
          <div key={index} className="grid grid-cols-1 w-full">
            <label
              title="wpp"
              className="uppercase text-sm text-gray-500 font-bold text-light md:text-sm"
            >
              {el.nombre.slice(7)}
            </label>
            <input
              className="px-3 h-10 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600 "
              type="text"
              name={el.nombre}
              defaultValue={el.valor}
              onChange={changeForm(index)}
            />
          </div>
        ))}
      </form>
      <hr className="w-full my-6 h-2"></hr>
    </>
  );
};

export default InputsVar;
