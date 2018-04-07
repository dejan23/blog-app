import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import { Router, Route, Link } from "react-router-dom";

class Verify extends React.Component {
  componentWillMount() {
    const token = this.props.match.params.token
    this.props.verifyUser(token)
  }

  render() {
    return (
      <div>
        {
          this.props.errorMessage ?
          <h2 style={{marginTop: '20px', textAlign: 'center'}}>{this.props.errorMessage}</h2> :
          <div style={{marginTop: '20px', textAlign: 'center'}}>You are successfuly verified. You can now login</div>
        }
      </div>

    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Verify);
