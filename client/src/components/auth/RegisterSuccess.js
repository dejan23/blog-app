import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';


class RegisterSuccess extends React.Component {

  render() {
    return (
      <div>
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <h3>Success</h3>
          <p>You should soon receive an email with confirmation token.</p>
        </div>
      </div>

    )
  }
}

export default connect(null, actions)(RegisterSuccess);
