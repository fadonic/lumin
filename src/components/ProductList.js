import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { getProductsQuery } from '../queries/productQueries'
import { getProducts, addProductsToCart, updateCurrency } from '../actions'
import Product from './Product'

class ProductList extends Component {
  state = {
    currency: '',
    product: {}
  }

  componentDidMount () {
    this.setState({
      currency: this.props.currency
    })
  }

  componentDidUpdate (prevProp, prevState) {
    if (!this.props.data.loading) {
      let products = this.props
      let productsPayload = {}
      productsPayload[products.currency] = products.data.products
      this.props.getProducts(productsPayload)

      let allProducts = localStorage.getItem('allProducts')
        ? JSON.parse(localStorage.getItem('allProducts'))
        : '{}'
      let productsArr = allProducts.products
      let currency = allProducts.currency
      let allProductsArr = []
      if (productsArr) {
        productsArr.forEach(item => {
          let found = products.data.products.filter(product => {
            return item.id === product.id
          })

          found[0].quantity = item.quantity

          allProductsArr = allProductsArr.concat(found)
        })

        this.props.updateCurrency(currency)
        this.props.addProductsToCart(allProductsArr)
      }
    }
  }

  displayProducts = () => {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }
    return this.props.data.products.map(product => {
      return (
        <Product
          currency={this.props.currency}
          key={product.id}
          product={product}
        />
      )
    })
  }

  render () {
    return (
      <div>
        <div className='bd-container'>
          <div className='product__list-header'>
            <h1>All Products</h1>
            <p>A 360° look at Lumin</p>
          </div>
        </div>
        <div className='product__list-data'>
          <div className='bd-container'>
            <div className='product section' id='product'>
              <div className='product__container bd-grid'>
                {this.displayProducts()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {
  getProducts,
  addProductsToCart,
  updateCurrency
})(
  graphql(getProductsQuery, {
    options: props => {
      return {
        variable: {
          currency: props.currency
        }
      }
    }
  })(ProductList)
)
