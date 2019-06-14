import React, {Component} from 'react';
import Proptypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody,
  Form, Label, Input, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {addIdea} from '../actions/ideaActions';


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
    const {error, isAuthenticated} = this.props;
    if(error !== prevProps.error) {
      //check for register error
      if(error.id === 'ADDITEM_FAIL') {
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
    const newIdea = {
      text: this.state.text
    }

    this.props.addIdea(newIdea);

    this.setState({
      text: ''
    });

    // this.toggle();
  }

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
          >Add idea</Button>
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
  addIdea: Proptypes.func.isRequired,
  error: Proptypes.object.isRequired
};

const mapStateToProps = state => ({
  idea: state.idea,
  error: state.error
});

export default connect(mapStateToProps, {addIdea})(IdeaModal);
