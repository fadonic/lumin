import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeCartState } from '../actions'

class Navbar extends Component {
  handleCartOpen = e => {
    e.preventDefault()
    this.props.changeCartState()
  }

  render () {
    let { cartProducts } = this.props.cart
    return (
      <header className='navbar'>
        <nav className='nav'>
          <a href='/' className='navbar-brand'>
            LUMIN
          </a>
          <ul className='navbar-list'>
            <li className='nav-item'>
              <a href='/' className='nav-link' onClick={this.handleCartOpen}>
                Account
                <i className='bx bx-cart nav__cart'></i>
                <span className='account__count'>{cartProducts.length}</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps, { changeCartState })(Navbar)
