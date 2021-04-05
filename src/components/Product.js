import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProductToCart } from '../actions/index'

class Product extends Component {
  handleAddToCart = e => {
    e.preventDefault()
    let newProduct = {
      id: this.props.product.id,
      image_url: this.props.product.image_url,
      title: this.props.product.title,
      price: this.props.product.price,
      quantity: 1
    }
    let currency = this.props.currency

    this.props.addProductToCart(currency, newProduct)
  }

  render () {
    const { id, image_url, title, price } = this.props.product
    const { currency } = this.props
    return (
      <div className='product'>
        <div className='product__box'>
          <img src={image_url} alt={title} />
        </div>

        <div className='product__data'>
          <h3 className='product__name'>{title}</h3>
          <span className='product__price'>
            From: {currency} {price}
          </span>
          <button
            dataid={id}
            onClick={this.handleAddToCart}
            className='product__button'
          >
            Add to cart
          </button>
        </div>
      </div>
    )
  }
}

export default connect(null, { addProductToCart })(Product)
