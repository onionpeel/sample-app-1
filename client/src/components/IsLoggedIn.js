import React, {Component, Fragment} from 'react';
import IdeaModal from './IdeaModal';
import {connect} from 'react-redux';
import Proptypes from 'prop-types';

class IsLoggedIn extends Component {
  render () {
    const {isAuthenticated} = this.props;

    return (
      <Fragment>
        {isAuthenticated ? <IdeaModal /> : <h2>Login to add your ideas</h2>}
      </Fragment>
    )
  }
};

IsLoggedIn.propTypes = {
  isAuthenticated: Proptypes.bool
};


const mapStateToProps = state => ({
  isAuthenticated: state.authenticate.isAuthenticated
});

export default connect(mapStateToProps, null)(IsLoggedIn);
