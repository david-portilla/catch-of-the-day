import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes"
import base from '../base'

export default class App extends Component {
  state = {
    fishes: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount () {
    const { params } = this.props.match
    // get the last localstorage item from previous session
    const localStorageRef = localStorage.getItem(params.storedId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${ params.storedId }/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate () {
    const nameStore = this.props.match.params.storedId
    localStorage.setItem(nameStore, JSON.stringify(this.state.order))
  }

  componentWillUnmount () {
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    const fishes = { ...this.state.fishes }
    fishes[ `fish${ Date.now() }` ] = fish
    this.setState({ fishes })
  }

  updateFish = (key, updateFish) => {
    const fishes = { ...this.state.fishes }
    fishes[ key ] = updateFish
    this.setState({ fishes })
  }

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes }
    fishes[ key ] = null
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = (key) => {
    const order = { ...this.state.order }
    order[ key ] = order[ key ] + 1 || 1
    this.setState({ order })
  }

  removeFromOrder = key => {
    const order = { ...this.state.order }
    delete order[ key ]
    this.setState({ order })
  }

  render () {
    return (
      <>
        {/* App.js */ }
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Fresh SeaFood Market" />
            <ul className="fishes">
              { Object.keys(this.state.fishes).map(key =>
                <Fish
                  key={ key }
                  index={ key }
                  data={ this.state.fishes[ key ] }
                  addToOrder={ this.addToOrder }
                />
              ) }
            </ul>
          </div>
          <Order
            fishes={ this.state.fishes }
            order={ this.state.order }
            removeFromOrder={ this.removeFromOrder }
          />
          <Inventory
            fishes={ this.state.fishes }
            loadSampleFishes={ this.loadSampleFishes }
            addFish={ this.addFish }
            updateFish={ this.updateFish }
            deleteFish={ this.deleteFish }
            storeId={ this.props.match.params.storedId }
          />
        </div>
      </>
    )
  }
}
