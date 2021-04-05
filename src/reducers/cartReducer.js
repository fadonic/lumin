import {
  ADD_TO_CART,
  ADD_PRODUCTS_TO_CART,
  DELETE_FROM_CART,
  UPDATE_QUANTITY,
  CHANGE_CART_STATE
} from '../actions/types'

let initialState = {
  cartProducts: [],
  open: false
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let pid = action.payload.id
      let isFound = state.cartProducts.find(({ id }) => {
        return id === pid
      })
      if (!isFound) {
        return {
          ...state,
          cartProducts: state.cartProducts.concat(action.payload),
          open: true
        }
      } else {
        return {
          ...state,
          cartProducts: state.cartProducts.map(product => {
            if (product.id === pid) {
              product.quantity++
            }
            return product
          }),
          open: true
        }
      }

    case UPDATE_QUANTITY:
      let updatedProducts = state.cartProducts.map(product => {
        if (product.id === action.payload.id) {
          product.quantity += action.payload.amount
        }
        return product
      })

      return {
        ...state,
        cartProducts: updatedProducts.filter(product => {
          return product.quantity > 0
        })
      }

    case ADD_PRODUCTS_TO_CART: {
      return {
        ...state,
        cartProducts: [...action.payload],
        open: true
      }
    }

    case DELETE_FROM_CART: {
      return {
        ...state,
        cartProducts: state.cartProducts.filter(product => {
          return product.id !== action.payload
        })
      }
    }

    case CHANGE_CART_STATE: {
      return {
        ...state,
        open: true
      }
    }

    default:
      return state
  }
}

export default cartReducer
