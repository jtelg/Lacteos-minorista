import { useState } from 'react';
import Categorias from './categorias';
import Marcas from './marcas';
import SubCategorias from './subCategorias';
const TablesConfig = () => {
  const [sub_categ, setSub_categ] = useState([]);
  const [categ, setCateg] = useState({});
  const [select, setSelect] = useState(1);

  return (
    <>
      <div className="w-[50%] flex justify-around mb-5 mt-10">
        <div className="w-full px-6 h-full">
          <div
            className={`border-2 border-primary-500 py-3 ${
              select === 1 ? 'bg-primary-500' : 'bg-white'
            } transition-all h-full flex items-center px-5  shadow-sm rounded-[0.7rem] cursor-pointer justify-center`}
            onClick={() => setSelect(1)}
            role="button"
            aria-hidden
          >
            <div className="mx-5">
              <div
                className={`uppercase font-bold tracking-tighter text-sm ${
                  select === 1 ? 'text-white' : 'text-gray-700'
                }`}
              >
                Categorias
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-6 h-full">
          <div
            className={`border-2 border-primary-500 py-3 ${
              select === 2 ? 'bg-primary-500' : 'bg-white'
            } transition-all h-full flex items-center px-5  shadow-sm rounded-[0.7rem] cursor-pointer justify-center `}
            onClick={() => setSelect(2)}
            role="button"
            aria-hidden
          >
            <div className="mx-5">
              <div
                className={`uppercase font-bold tracking-tighter text-sm text-center ${
                  select === 2 ? 'text-white' : 'text-gray-700'
                }`}
              >
                Marcas
              </div>
            </div>
          </div>
        </div>
      </div>
      {select === 1 ? (
        <div className="flex w-full justify-around mt-7">
          <Categorias setSub_categ={setSub_categ} setCateg={setCateg} />
          <SubCategorias sub_categ={sub_categ} categ={categ} />
        </div>
      ) : (
        <Marcas setSub_categ={setSub_categ} setCateg={setCateg} />
      )}
    </>
  );
};

export default TablesConfig;
