import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class AddFish extends Component {

  static propTypes = {
    addFish: PropTypes.func
  }

  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descriptionRef = React.createRef()
  imageRef = React.createRef()
  createFish = (e) => {
    e.preventDefault()
    const fish = {
      nameRef: this.nameRef.current.value,
      priceRef: parseFloat(this.priceRef.current.value),
      statusRe: this.statusRef.current.value,
      descript: this.descriptionRef.current.value,
      imageRef: this.imageRef.current.value
    }
    this.props.addFish(fish)
    e.currentTarget.reset()
  }
  render () {
    return (
      <form className="fish-edit" onSubmit={ this.createFish }>
        <input name="name" ref={ this.nameRef } type="text" placeholder="Name" />
        <input name="price" ref={ this.priceRef } type="number" placeholder="Price" />
        <select name="status" ref={ this.statusRef }>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="description" ref={ this.descriptionRef } type="text" placeholder="Description"></textarea>
        <input name="image" ref={ this.imageRef } type="text" placeholder="Image" />
        <button type="submit"> + Add fish</button>
      </form>
    )
  }
}
