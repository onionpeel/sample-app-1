import React, {Component} from 'react';
import Proptypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody,
  Form, Label, Input, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {addIdea, clearIsAddedIdea} from '../actions/ideaActions';
import {clearErrors} from '../actions/errorActions';

class IdeaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      text: '',
      message: null
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {error, isAdded} = this.props;
    if(error !== prevProps.error) {
      //check for input error
      if(error.id === 'ADDITEM_FAIL') {
        this.setState({message: error.message.errors[0].msg})
      } else {
        this.setState({message: null});
      }
    }

    if(this.state.modal) {
      if(isAdded) {
        this.toggle();
      }
    }
  }

  toggle() {
    this.props.clearErrors();
    this.props.clearIsAddedIdea();
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.setState({
      text: ''
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const newIdea = {
      text: this.state.text
    }

    this.props.addIdea(newIdea);
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated && <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
          >
            Add idea
          </Button>}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Ideas List</ModalHeader>
          <ModalBody>
            {this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <Label for="idea">Idea</Label>
              <Input
                type="text"
                name="text"
                id="idea"
                placeholder="Add idea"
                onChange={this.onChange}
              />
              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >Add Idea</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

IdeaModal.propTypes = {
  clearIsAddedIdea: Proptypes.func.isRequired,
  isAdded: Proptypes.bool,
  addIdea: Proptypes.func.isRequired,
  error: Proptypes.object.isRequired,
  clearErrors: Proptypes.func.isRequired,
  isAuthenticated: Proptypes.bool
};

const mapStateToProps = state => ({
  isAdded: state.idea.isAdded,
  error: state.error,
  isAuthenticated: state.authenticate.isAuthenticated
});

export default connect(mapStateToProps, {addIdea, clearIsAddedIdea, clearErrors})(IdeaModal);
