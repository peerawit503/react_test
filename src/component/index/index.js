import React, { Component } from 'react';

import './index.css'

import Regismember from '../Regismember';
import Navbar from '../Navbar';
import MemberList from '../MemberList';
import { Route } from 'react-router-dom'
import firebase from 'firebase';
class App extends Component {

  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyBVOJt7Hhpb33ZGwK_gK776GsAsXsUTEHs",
      authDomain: "test-auth-4779c.firebaseapp.com",
      databaseURL: "https://test-auth-4779c.firebaseio.com",
      projectId: "test-auth-4779c",
      storageBucket: "test-auth-4779c.appspot.com",
      messagingSenderId: "767580202481"
    };
    this.state = {
      email: '',
      password: '',
      currentUser: null,
      message: ''
    }
    firebase.initializeApp(config);
  }
  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        })
      }
    })
  }

  onChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          currentUser: response.user
        })
      })
      .catch(error => {
        this.setState({
          message: error.message
        })
      })
  }

  logout = e => {
    e.preventDefault()
    firebase.auth().signOut().then(response => {
      this.setState({
        currentUser: null
      })
    })
  }

  render() {
    const { message, currentUser } = this.state
    if (currentUser) {
      return (

        <div>
          <Navbar session={this.state.currentUser} />
          <Route exact path="/" render={(props) => <Regismember {...props} db={firebase} />} />
          <Route exact path="/memberlist" render={(props) => <MemberList {...props} db={firebase} />} />
        </div>
      )
    } else {
      return (
        <div>
          <Navbar session={this.state.currentUser} />

          <div className="columns is-centered">
            <div className="column is-half">
              <form onSubmit={this.onSubmit}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                {message ? <p className="help is-danger">{message}</p> : null}

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link">Submit</button>
                  </div>
                  <div className="control">
                    <button className="button is-text">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      );
    }

  }
}

export default App;
