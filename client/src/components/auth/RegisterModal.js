import React, {Component} from 'react';
import Proptypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody,
  Form, Label, Input, NavLink, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {register} from '../../actions/authenticateActions';
import {clearErrors} from '../../actions/errorActions';

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      email: '',
      password: '',
      message: null
    };

    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    isAuthenticated: Proptypes.bool,
    error: Proptypes.object.isRequired,
    register: Proptypes.func.isRequired,
    clearErrors: Proptypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const {error, isAuthenticated} = this.props;
    if(error !== prevProps.error) {
      //check for register error
      if(error.id === 'REGISTER_FAIL') {
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

    const {name, email, password} = this.state;

    //Create user object
    const newUser = {
      name,
      email,
      password
    };

    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <Label for="name">Name</Label>
              <Input
                className="mb-3"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={this.onChange}
              />

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
              >Register</Button>
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
  register,
  clearErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
