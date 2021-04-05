import { GET_PRODUCTS, GET_CURRENCY, UPDATE_CURRENCY } from '../actions/types'

let initialState = {
  products: [],
  currency: 'NGN'
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    }
    case GET_CURRENCY: {
      return {
        ...state,
        currency: action.payload
      }
    }

    case UPDATE_CURRENCY: {
      return {
        ...state,
        currency: action.payload
      }
    }

    default:
      return state
  }
}

export default productReducer
