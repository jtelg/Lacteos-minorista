export const ADD_CARD = (payload) => {
  return (dispatch) => {
    try {
      return dispatch({
        type: 'ADD_CARD',
        payload: payload
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
        type: 'DELETE_CART',
        payload: payload
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const CARRITO_DELETE_ALL = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'CARRITO_DELETE_ALL'
    });
  } catch (error) {
    console.error(error);
  }
};

export const GLOBAL_VARS = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'GLOBAL_VARS',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const SESSION_SET = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'SESSION_SET',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const ARR_NAV = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'ARR_NAV',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const RELOAD_TABLERO = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'RELOAD_TABLERO',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const RELOAD_CAJA = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'RELOAD_CAJA',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};
