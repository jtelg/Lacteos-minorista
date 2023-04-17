import localStorage from "../utils/localstorage";

const initialState = {
  carrito: [],
};

const Reducer = (state = initialState, { type, payload }) => {
  let carro = [];
  switch (type) {
    case "ADD_CARD":
      if (state.carrito) carro = [...state.carrito, payload];
      // localStorage.setToStorage("arr_carro", carro);
      return {
        ...state,
        carrito: carro,
      };
    case "DELETE_CART":
      if (payload.length < 1) {
        carro = [];
      } else {
        carro = state.carrito.filter((d) => {
          return d.idpicada != payload;
        });
      }
      // localStorage.deleteFromStorage("arr_carro", carro);
      return {
        ...state,
        carrito: carro,
      };
    case "CARRITO_DELETE_ALL":
      // localStorage.setToStorage("arr_carro", []);
      return {
        ...state,
        carrito: [],
      };
    default:
      return state;
  }
};

export default Reducer;
