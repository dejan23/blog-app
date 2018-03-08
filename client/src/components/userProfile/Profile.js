import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import ProfilePage from './ProfilePage';

class Profile extends React.Component {
  componentWillMount() {
     this.props.startSetUser(this.props.match.params.id)
  }

  render() {
    return(
      <div>
        {
          this.props.user && this.props.match.params.id ?
          <ProfilePage {...this.props}/> :
          <div>404</div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user.user
})

export default connect(mapStateToProps, actions)(Profile)
