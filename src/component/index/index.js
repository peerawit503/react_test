import React, { Component } from 'react';

import './index.css'

import Regismember from '../Regismember';
import firebase from 'firebase/app';
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
    firebase.initializeApp(config);
  }
  render() {
    return (
      <div id='form' className="regisform">
        <Regismember/>
        
      </div>
    );
  }
}

export default App;
