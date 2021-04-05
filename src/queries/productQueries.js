import { gql } from 'apollo-boost'

const getCurrencyQuery = gql`
  {
    currency
  }
`

const getProductsQuery = gql`
  query getProducts($currency: Currency) {
    products {
      id
      image_url
      title
      price(currency: $currency)
    }
  }
`

export { getProductsQuery, getCurrencyQuery }
