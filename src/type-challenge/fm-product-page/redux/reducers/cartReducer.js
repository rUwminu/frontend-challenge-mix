import {
  ADD_ITEM_TO_CART_FAIL,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART,
} from '../constants/cartConstant'

export const cartListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true }
    case ADD_ITEM_TO_CART_SUCCESS:
      const curItem = action.payload
      const curItemList = state.myCart
      const checkItem = curItemList.find((obj) => obj.id === curItem.id)

      if (!checkItem) {
        return {
          ...state,
          loading: false,
          myCart: [...state.myCart, action.payload],
        }
      } else {
        const newArray = curItemList.map((item) => {
          var temp = Object.assign({}, item)

          if (temp.id === curItem.id) {
            temp.qty = temp.qty + curItem.qty
          }

          return temp
        })

        return {
          ...state,
          loading: false,
          myCart: [...newArray],
        }
      }
    case ADD_ITEM_TO_CART_FAIL:
      return { ...state, loading: false, error: action.payload }
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        myCart: state.myCart.filter((x) => x.id !== action.payload),
      }
    default:
      return state
  }
}
