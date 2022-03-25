import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstant";

export const productListReducer = (state = { allProduct: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        //allProduct: [...action.payload],
        allProduct: [...state.allProduct, ...action.payload],
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        allProductError: action.payload,
      };
    default:
      return state;
  }
};
