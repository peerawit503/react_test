import React, { Component } from 'react';

import './index.css'

import Regismember from '../Regismember';
import Navbar from '../Navbar';
import MemberList from '../MemberList';
import { Route } from 'react-router-dom'
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas   } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
function authUser() {
  return new Promise(function (resolve, reject) {
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           resolve(user);
        } else {
           reject('User not logged in');
        }             
     });
  });
}

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
      message: '',
      isAuthenticating: false
    }
   
    firebase.initializeApp(config);
  }

  componentWillMount() {
    
    authUser().then((user) => {
     
    if(user){  this.setState({ 
        isAuthenticating: true,
        currentUser: user
      });}
    }, (error) => {
      this.setState({ isAuthenticating: true });
      // alert(error);
    });
    
  }
  componentDidUpdate(){
    if(this.props.location.logout){
      this.props.location.logout = false
      this.setState({
        isAuthenticating:true,
        currentUser:null
      })
    }
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
    if (this.state.isAuthenticating) {
      if(currentUser){
      return (

        <div>
          <Route path="/" render={(props) => <Navbar {...props} db={firebase} session={this.state.currentUser} />} />
          <Route exact path="/" render={(props) => <Regismember {...props} db={firebase} />} />
          <Route exact path="/memberlist" render={(props) => <MemberList  db={firebase} />} />
        </div>
      )
      }else{
        return (
          
            <div >
              <Navbar session={this.state.currentUser} />
              <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                  <div id="login-column" className="col-md-9">
                    <div id="login-box" className="col-md-12">
                      <form id="login-form" onSubmit={this.onSubmit}>
                        <h3 className="text-center text-info">Login</h3>
                        <div className="form-group">
                          <label htmlFor="username" className="text-info">Username:</label><br />
                          <input
    
    
                            id="email"
                            className="form-control"
                            type="email"
                            name="email"
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username" className="text-info">Password:</label><br />
                          <input
    
    
                            id="password"
                            className="form-control"
                            type="password"
                            name="password"
                            onChange={this.onChange}
                          />
                        </div>
                        {message ? <p className="help is-danger">{message}</p> : null}
    
    
                        <div className="form-group">
                          <button className="btn btn-info btn-md">Login</button>
                        </div>
    
    
                      </form>
                    </div>
                  </div>
                </div>
              </div>
    
            </div>
    
          );
      }
    } else {
      return null;
    }

  }
}

export default withRouter(App);
