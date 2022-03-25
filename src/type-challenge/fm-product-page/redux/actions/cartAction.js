import {
  ADD_ITEM_TO_CART_FAIL,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART,
} from "../constants/cartConstant";

export const addItemToCart = (item) => (dispatch) => {
  dispatch({
    type: ADD_ITEM_TO_CART_REQUEST,
  });

  try {
    if (!item.error) {
      dispatch({
        type: ADD_ITEM_TO_CART_SUCCESS,
        payload: item,
      });
    } else {
      dispatch({
        type: ADD_ITEM_TO_CART_FAIL,
        payload: item.error,
      });
    }
  } catch (err) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAIL,
      payload: err,
    });
  }
};

export const removeItemFromCart = (itemId) => (dispatch) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: itemId,
  });
};
