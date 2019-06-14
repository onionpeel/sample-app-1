import React, {Component} from 'react';
import Proptypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody,
  Form, Label, Input, NavLink, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {login} from '../../actions/authenticateActions';
import {clearErrors} from '../../actions/errorActions';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: '',
      message: null
    };

    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    isAuthenticated: Proptypes.bool,
    error: Proptypes.object.isRequired,
    login: Proptypes.func.isRequired,
    clearErrors: Proptypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const {error, isAuthenticated} = this.props;
    if(error !== prevProps.error) {
      //check for register error
      if(error.id === 'LOGIN_FAIL') {
        this.setState({message: error.message.errors[0].msg})
      } else {
        this.setState({message: null});
      }
    }
    //If authenticated, close modal
    if(this.state.modal) {
      if(isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle() {
    //Clear errors
    this.props.clearErrors();
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const {email, password} = this.state;

    const user = {
      email,
      password
    };

    //Attempt to login
    this.props.login(user);

    // if(this.props.isAuthenticated) {
    //   this.setState({
    //     email: '',
    //     password: ''
    //   });
    // };

  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <Label for="email">Email</Label>
              <Input
                className="mb-3"
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={this.onChange}
              />

              <Label for="name">Password</Label>
              <Input
                className="mb-3"
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                onChange={this.onChange}
              />

              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >Login</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authenticate.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = {
  login,
  clearErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
