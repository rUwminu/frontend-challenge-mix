import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// Reducer Imports
import { cartListReducer } from './reducers/cartReducer'
import { productListReducer } from './reducers/productReducer'

const initialState = {
  cartList: {
    myCart: [],
  },
  productList: {
    allProduct: [],
  },
}

const reducer = combineReducers({
  cartList: cartListReducer,
  productList: productListReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
)

export default store
