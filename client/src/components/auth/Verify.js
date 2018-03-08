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
    console.log(this.props.match.params.token)
    return (
      <div>
        <div style={{marginTop: '20px', textAlign: 'center'}}>You are successfuly verified. You can now login</div>
      </div>

    )
  }
}

export default connect(null, actions)(Verify);
