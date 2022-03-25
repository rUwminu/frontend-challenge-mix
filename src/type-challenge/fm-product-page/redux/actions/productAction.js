import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstant";

export const getProductList = (list) => (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  try {
    if (list) {
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: list,
      });
    }

    if (list.error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: list.error,
      });
    }
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err,
    });
  }
};
