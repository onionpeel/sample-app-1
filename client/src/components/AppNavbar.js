import React, {Component, Fragment} from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  static propTypes = {
    authenticate: PropTypes.object.isRequired
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    const {isAuthenticated, user} = this.props.authenticate;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/onionpeel/sample-app-1">Project</NavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="https://github.com/onionpeel/sample-app-1">Project</NavLink>
        </NavItem>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Ideas</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks: guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticate: state.authenticate
});

export default connect(mapStateToProps, null)(AppNavbar);
