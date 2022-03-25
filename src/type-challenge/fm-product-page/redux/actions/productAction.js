import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstant'

// Extra dummy product image
import product1 from '../../assets/product-imgs/image-product-1.jpg'
import product2 from '../../assets/product-imgs/image-product-2.jpg'
import product3 from '../../assets/product-imgs/image-product-3.jpg'

export const getProductList = (list) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  })

  try {
    let tempArr = [...list].map((item) => {
      return {
        ...item,
        image: [item.image.src, product1, product2, product3],
      }
    })

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: tempArr,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err,
    })
  }
}
