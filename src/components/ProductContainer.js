import React, { Component } from 'react'
import ProductList from './ProductList'
import { connect } from 'react-redux'

class ProductContainer extends Component {
  state = {
    currency: 'NGN'
  }

  componentDidMount () {
    this.setState({
      currency: this.props.products.currency
    })
    localStorage.setItem('currency', this.state.currency)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.currency !== this.props.products.currency) {
      let allProducts = localStorage.getItem('allProducts')
        ? localStorage.getItem('allProducts')
        : '{}'

      let currency = JSON.parse(allProducts).currency
      this.setState({
        currency: currency
      })
    }
  }

  render () {
    return <ProductList currency={this.state.currency} />
  }
}

const mapStateToProps = state => {
  return {
    products: state.product,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(ProductContainer)
