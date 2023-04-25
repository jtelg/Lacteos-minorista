import localStorage from "../utils/localstorage";

const initialState = {
  carrito: [],
};
let index_exist = -1;

const Reducer = (state = initialState, { type, payload }) => {
  let carro = [];

  switch (type) {
    case "ADD_CARD":
      if (state.carrito) {
        index_exist = state.carrito.findIndex((d) => {
          return d.idpicada === payload.idpicada;
        });
      }
      if (index_exist > -1) {
        carro = state.carrito;
      } else {
        carro = [...(state.carrito ? state.carrito : []), payload];
      }
      localStorage.setToStorage("arr_carro", carro);
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
      localStorage.setToStorage("arr_carro", carro);
      return {
        ...state,
        carrito: carro,
      };
    case "CARRITO_DELETE_ALL":
      localStorage.setToStorage("arr_carro", []);
      return {
        ...state,
        carrito: [],
      };
    case "GLOBAL_VARS":
      return {
        ...state,
        globalVars: payload,
      };
    case "SESSION_SET":
      localStorage.setToStorage("session", payload);
      return {
        ...state,
        session: payload,
      };
    case "ARR_NAV":
      return {
        ...state,
        arr_nav: payload,
      };
    case "RELOAD_TABLERO":
      return {
        ...state,
        reloadTablero: payload,
      };
    case "RELOAD_CAJA":
      return {
        ...state,
        reloadCaja: payload,
      };
    default:
      return state;
  }
};

export default Reducer;
