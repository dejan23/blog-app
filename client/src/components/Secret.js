import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';


class Secret extends React.Component {
  render() {
    return(
      <div>
        {this.props.fetchMessage()}
        {console.log('somewhere here is a hidden super secret code... Can you find it?')}
        {console.log('... also this is not really a blog app...')}
        <div style={{marginTop: '20px', textAlign: 'center'}}>i suck at css styling...</div>
        <div className="secret2" style={{marginTop: '420px', textAlign: 'center'}}>there is something in the console...</div>
      </div>
    )
  }
}

export default connect(null, actions)(Secret)

// const Secret = () => (
//   <div className="content-container">
//     Secret page content
//   </div>
// )
//
// export default Secret;
