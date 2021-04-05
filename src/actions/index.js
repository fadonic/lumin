import {
  ADD_TO_CART,
  ADD_PRODUCTS_TO_CART,
  DELETE_FROM_CART,
  GET_PRODUCTS,
  GET_CURRENCY,
  UPDATE_CURRENCY,
  UPDATE_QUANTITY,
  UPDATE_CART_STATE,
  CHANGE_CART_STATE
} from './types'

import {
  addToLocalstorage,
  deleteFromLocalStorage,
  updateLocalStorage
} from '../utils'

export const updateQuantity = payload => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_QUANTITY,
      payload
    })
    updateLocalStorage(payload)
  }
}

export const addProductToCart = (currency, product) => {
  return function (dispatch) {
    addToLocalstorage(currency, product)
    dispatch({
      type: ADD_TO_CART,
      payload: product
    })
  }
}

export const addProductsToCart = productsPayload => {
  return function (dispatch) {
    dispatch({
      type: ADD_PRODUCTS_TO_CART,
      payload: productsPayload
    })
  }
}

export const deleteFromCart = productId => {
  return function (dispatch) {
    dispatch({
      type: DELETE_FROM_CART,
      payload: productId
    })
    deleteFromLocalStorage(productId)
  }
}

export const updateCurrency = currency => {
  let { products } = JSON.parse(localStorage.getItem('allProducts'))
  let storeItems = { currency: currency, open: true, products }
  localStorage.setItem('allProducts', JSON.stringify(storeItems))
  return function (dispatch) {
    dispatch({
      type: UPDATE_CURRENCY,
      payload: currency
    })
  }
}

export const updateCartState = () => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_CART_STATE
    })
  }
}

export const getCurrency = () => {
  let currency = localStorage.getItem('currency')
    ? localStorage.getItem('currency')
    : ''
  return function (dispatch) {
    dispatch({ type: GET_CURRENCY, payload: currency })
  }
}

export const getProducts = (productsPayload, currency) => {
  localStorage.setItem('currency', currency)
  return function (dispatch) {
    dispatch({
      type: GET_PRODUCTS,
      payload: productsPayload
    })
  }
}

export const changeCartState = () => {
  return function (dispatch) {
    dispatch({
      type: CHANGE_CART_STATE
    })
  }
}
