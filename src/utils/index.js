export const updateLocalStorage = payload => {
  let { products, currency } = JSON.parse(localStorage.getItem('allProducts'))

  let updatedProducts = products.map(product => {
    if (product.id === payload.id) {
      product.quantity += payload.amount
    }
    return product
  })

  updatedProducts = updatedProducts.filter(product => {
    return product.quantity > 0
  })

  let storeItems = { currency: currency, open: true, products: updatedProducts }
  localStorage.setItem('allProducts', JSON.stringify(storeItems))
}

export const deleteFromLocalStorage = id => {
  let allProducts = JSON.parse(localStorage.getItem('allProducts'))
  let { products, currency } = allProducts

  products = products.filter(product => {
    return product.id !== id
  })

  let storeItems = { currency, open: true, products }
  localStorage.setItem('allProducts', JSON.stringify(storeItems))
}

export const addToLocalstorage = (currency, product) => {
  let allProducts = localStorage.getItem('allProducts')
    ? localStorage.getItem('allProducts')
    : '{}'

  let productsArr = JSON.parse(allProducts).products
    ? JSON.parse(allProducts).products
    : []

  let productId = product.id

  let isFound = productsArr.find(({ id }) => {
    return id === productId
  })

  if (isFound) {
    productsArr.forEach(product => {
      if (product.id === productId) {
        product.quantity++
      }
    })
  } else {
    productsArr.push(product)
  }

  let storeItems = { currency: currency, open: true, products: productsArr }
  // console.log(storeItems)
  localStorage.setItem('allProducts', JSON.stringify(storeItems))
}
