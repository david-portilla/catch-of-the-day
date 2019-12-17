import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from "../helpers";

export default class Fish extends Component {
  static propTypes = {
    data: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  }
  handleClick = () => {
    this.props.addToOrder(this.props.index)
  }
  render () {
    const { image, name, desc, price } = this.props.data
    const isAvailable = this.props.data.status === 'available'
    return (
      <li className="menu-fish">
        <img src={ image } alt={ name } />
        <h3 className="fish-name">
          { name }
          <span className="price">{ formatPrice(price) }</span>
        </h3>
        <p>{ desc }</p>
        <button
          disabled={ !isAvailable }
          onClick={ this.handleClick }
        >
          { isAvailable ? 'Add to cart' : 'Sold out' }
        </button>
      </li>
    )
  }
}
