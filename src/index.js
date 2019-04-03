import React from 'react';
import ReactDOM from 'react-dom';

import App from './component/index';
import Navbar from './component/Navbar'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'

const AppWithRouter = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  
ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
ReactDOM.render(<Navbar />, document.getElementById('nav'));
serviceWorker.unregister();
