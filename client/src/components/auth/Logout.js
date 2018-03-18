import React from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/auth';
import {addFlashMessage} from '../../actions/flashMessages';

class Logout extends React.Component {
  componentWillMount() {
    this.props.addFlashMessage({
      type: 'info',
      message: 'You are now logged out'
    });
    this.props.logoutUser();
  }

  render() {
    return (
      <div style={{marginTop: '20px', textAlign: 'center'}}>
        Sorry to see you go
      </div>
    );
  }
}

export default connect(null, {logoutUser, addFlashMessage})(Logout);
