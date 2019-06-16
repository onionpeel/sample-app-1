import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getIdeas, deleteIdea} from '../actions/ideaActions';
import Proptypes from 'prop-types';

class IdeasList extends Component {
  static propTypes = {
    getIdeas: Proptypes.func.isRequired,
    idea: Proptypes.object.isRequired,
    isAuthenticated: Proptypes.bool
  };

  componentDidMount() {
    this.props.getIdeas();
  }

  onDeleteClick = id => {
    this.props.deleteIdea(id);
  }


  render() {
    const {ideas} = this.props.idea;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="ideas-list">
            {ideas.map(({_id, text}) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated && <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>}
                {text}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  idea: state.idea,
  isAuthenticated: state.authenticate.isAuthenticated
});

export default connect(mapStateToProps, {getIdeas, deleteIdea})(IdeasList);
