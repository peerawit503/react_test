import React from 'react';
import firebase from 'firebase'
import './navbar.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    console.log(this.props)
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
    })
    window.location.reload();
  }
  render() {
    if(this.props.session){
      return (
        <div className="nav-bar">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">reactstrap</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Member List</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={this.logout}>Logout</NavLink>
                </NavItem>
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