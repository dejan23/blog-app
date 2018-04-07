import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import ProfilesList from './ProfilesList';

class Profiles extends React.Component {
  componentWillMount() {
    this.props.startSetUsers()
  }

  render() {
    return(
      <div className="content-container content-container--list">
      <div className="profile-list-header">
        <div className="show-for-mobile">Users</div>
        <div className="show-for-desktop">User</div>
        <div className="show-for-desktop">Joined</div>
      </div>
      <div className="profile-list-body">
        {!this.props.users ? (
          <div className="list-item list-item--message">
              <span>No users</span>
            </div>
        ) : (
          this.props.users.map((user) => {
            return <ProfilesList key={user._id} {...user} />
          })
        )
      }
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users
})

export default connect(mapStateToProps, actions)(Profiles)
