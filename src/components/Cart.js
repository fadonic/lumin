import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { getCurrencyQuery } from '../queries/productQueries'
import { updateCurrency, updateQuantity, deleteFromCart } from '../actions'

class Cart extends Component {
  state = {
    currency: '',
    open: false
  }

  componentDidMount () {
    this.setState({
      currency: this.props.currency
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.cart.open !== prevState.open) {
      this.setState({
        open: true
      })
    }
  }

  handleChangeCurrency = e => {
    this.setState({
      currency: e.target.value
    })
    this.props.updateCurrency(e.target.value)
  }

  handleDelete = id => {
    this.props.deleteFromCart(id)
  }

  getTotal = () => {
    let total = 0
    this.props.cart.cartProducts.forEach(product => {
      total += product.quantity * product.price
    })
    return total
  }

  handleUpdateQuantity = (id, type) => {
    let payload = { id }

    if (type === 'increment') {
      payload.amount = 1
    }
    if (type === 'decrement') {
      payload.amount = -1
    }
    this.props.updateQuantity(payload)
  }

  displayProducts = () => {
    let products = this.props.cart.cartProducts
    if (products.length === 0) {
      return <div className='cart__empty'>There is no item in the cart</div>
    } else
      return products.map(product => {
        return (
          <div className='cart__body' key={product.id}>
            <div className='cart__list'>
              <div className='cart__item'>
                <div className='cart__info'>
                  <span
                    className='remove__btn'
                    onClick={e => this.handleDelete(product.id)}
                  >
                    X
                  </span>
                  <h3>{product.title}</h3>
                  <div>
                    <span>Combination</span>
                  </div>
                  <div>
                    <span>One time purchase of Two Month supply</span>
                  </div>
                  <div className='quantity'>
                    <div className='quantity__selector'>
                      <span
                        className='counter__btn'
                        onClick={() =>
                          this.handleUpdateQuantity(product.id, 'decrement')
                        }
                      >
                        -
                      </span>
                      <span className='counter__number'>
                        {product.quantity}
                      </span>
                      <span
                        className='counter__btn'
                        onClick={() =>
                          this.handleUpdateQuantity(product.id, 'increment')
                        }
                      >
                        +
                      </span>
                    </div>
                    <div className='cart__item-price'>
                      <span>{this.props.products.currency}</span>
                      <span>
                        {Number(
                          (product.quantity * product.price).toFixed(2)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='cart__image'>
                  <img src={product.image_url} alt={product.title}></img>
                </div>
              </div>
            </div>
          </div>
        )
      })
  }

  displayCurrencies = () => {
    let data = this.props.data
    if (data.loading) {
      return <option disabled>loading...</option>
    } else {
      const currencies = data.currency.map(item => {
        return <option key={item}>{item}</option>
      })
      return currencies
    }
  }

  toggleCart = () => {
    this.setState({
      open: false
    })
  }

  render () {
    return (
      <div className={this.state.open ? 'cart' : 'd-none'}>
        <div className='cart-container'>
          <div className='cart__top'>
            <div className='left' onClick={this.toggleCart}>
              <div>x</div>
            </div>
            <div className='right'>Your cart</div>
          </div>
          <div className='currency-container'>
            <select
              className='currency__select'
              onChange={this.handleChangeCurrency}
              value={this.props.products.currency}
            >
              {this.displayCurrencies()}
            </select>
          </div>

          {this.displayProducts()}

          <div className={this.state.cartCount ? 'd-none' : 'cart__footer'}>
            <div className='cart__subtotal'>
              <span>Subtotal</span>
              <div className='subtotal__price'>
                <span>{this.props.products.currency}</span>
                <span>
                  {Number(this.getTotal().toFixed(2)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product,
    cart: state.cart
  }
}

export default connect(mapStateToProps, {
  updateCurrency,
  updateQuantity,
  deleteFromCart
})(
  graphql(getCurrencyQuery, {
    options: props => {
      return {
        variable: {
          currency: props.currency
        }
      }
    }
  })(Cart)
)
