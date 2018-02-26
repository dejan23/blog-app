import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Logout extends React.Component {
  componentWillMount() {
    this.props.logoutUser();
  }

  render() {
    return <div style={{marginTop: '20px', textAlign: 'center'}}>Sorry to see you go</div>
  }
}

export default connect(null, actions)(Logout);
