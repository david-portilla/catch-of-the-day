import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      value: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  }

  handleChange = event => {
    const updatedFish = {
      ...this.props.fish,
      [ event.currentTarget.name ]: event.currentTarget.value
    }
    this.props.updateFish(this.props.index, updatedFish)
  }

  // handleDeleteFish = event => {
  //   const fishesToDelete = {
  //     ...this.props.fish,
  //   }
  //   this.props.deleteFish(this.props.index, fishesToDelete)
  // }

  render () {
    return (
      <div className='fish-edit'>
        <input type="text" name="name" onChange={ this.handleChange } value={ this.props.fish.name } />
        <input type="text" name="price" onChange={ this.handleChange } value={ this.props.fish.price } />
        <select type="text" name="status" onChange={ this.handleChange } value={ this.props.fish.status }>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" onChange={ this.handleChange } value={ this.props.fish.desc }></textarea>
        <input type="text" name="image" onChange={ this.handleChange } value={ this.props.fish.image } />
        {/* <button onClick={ this.handleDeleteFish }> Remove Fish</button> */ }
        <button onClick={ () => this.props.deleteFish(this.props.index) }> Remove Fish</button>
      </div>
    )
  }
}