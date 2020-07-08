import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import AddFish from './AddFish'
import EditFishForm from './EditFishForm'
import Login from './Login'
import base, { firebaseApp } from '../base'

export default class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  }

  state = {
    uid: null,
    owner: null
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async (authData) => {
    const store = await base.fetch(this.props.storeId, { context: this })
    // console.log('store', store)
    if (!store.owner) {
      await base.post(`${ this.props.storeId }/owner`, {
        data: authData.user.uid
      })
    }
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
    // console.log('authData: ', authData.user.uid)
  }

  authenticate = provider => {
    // console.log('provider: ', provider)
    // const authProvider = new firebase.auth.FacebookAuthProvider()
    const authProvider = new firebase.auth[ `${ provider }AuthProvider` ]()
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler).catch(error => console.log('error.code', error.code))
  }

  logout = async () => {
    // console.log('logging out')
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render () {
    // const logout = <button onClick={ this.logout }> Log out!</button>
    // // check if they are logged in
    // if (!this.state.uid) {
    //   return <Login authenticate={ this.authenticate } />
    // }
    // // check if they are NOT the owner of the store
    // if (this.state.uid !== this.state.owner) {
    //   return <div>
    //     <p> <strong>Sorry you are not the owner!</strong> You are not allow to handle this inventory</p>
    //     { logout }
    //     <br /><br />
    //   </div>
    // }
    // they are the owner, render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {/* { logout } */}
        <br /><br />
        { Object.keys(this.props.fishes).map(key =>
          <EditFishForm
            key={ key }
            index={ key }
            fish={ this.props.fishes[ key ] }
            updateFish={ this.props.updateFish }
            deleteFish={ this.props.deleteFish }
          />
        ) }
        <AddFish addFish={ this.props.addFish } />
        <button onClick={ this.props.loadSampleFishes }>Load sample fishes</button>
      </div>
    )
  }
}
