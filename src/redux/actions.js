export const ADD_CARD = (payload) => {
  return (dispatch) => {
    try {
      return dispatch({
        type: "ADD_CARD",
        payload: payload,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const DELETE_CART = (payload) => {
  return (dispatch) => {
    try {
      return dispatch({
        type: "DELETE_CART",
        payload: payload,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const CARRITO_DELETE_ALL = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: "CARRITO_DELETE_ALL",
    });
  } catch (error) {
    console.error(error);
  }
};
