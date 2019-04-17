import React from 'react';
import firebase from 'firebase';
import './navbar.css';
import logo from './index/logo.png';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    let nameCapitalized = '';
    if(this.props.session){
      const result = this.props.session.email.split('@');
      nameCapitalized = result[0][0].toUpperCase() + result[0].slice(1)
    }
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      username:nameCapitalized
    };
    
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = e => {
    e.preventDefault()
    firebase.auth().signOut().then(response => {
      this.setState({
        currentUser: null
      })
      this.props.history.push({
        pathname: '/',
        state: { isAuthenticating: false },
        logout:true
      });
    })
      
  }
  
  render() {
    if(this.props.session){
      return (
        <div className="nav-bar">
          <Navbar color="light" light expand="md">
            <NavbarBrand tag={RRNavLink} exact to="/"> <img src={logo} alt="Logo" className="logo" /></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/" className="nav-link">Register</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/memberlist">Member List</Link>
                </NavItem>
                {/* <NavItem>
                  <NavLink href="#" onClick={this.logout}>Logout</NavLink>
                </NavItem> */}
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                {this.state.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>
                  {this.props.session.email}
                  </DropdownItem>
                 
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
    else{
      return (
        <div className="nav-bar">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">reactstrap</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
}