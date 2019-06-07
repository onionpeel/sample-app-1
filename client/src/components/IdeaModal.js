import React, {Component} from 'react';
import Proptypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody,
  Form, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {addIdea} from '../actions/ideaActions';


class IdeaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      text: ''
    };

    this.toggle = this.toggle.bind(this);
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

    this.toggle();
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
  addIdea: Proptypes.func.isRequired
};

const mapPropToState = state => ({
  idea: state.idea
});

export default connect(mapPropToState, {addIdea})(IdeaModal);
