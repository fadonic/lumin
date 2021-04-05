import { combineReducers } from 'redux'
import cartReducer from '../reducers/cartReducer'
import productReducer from '../reducers/productReducer'

export default combineReducers({
  product: productReducer,
  cart: cartReducer
})
