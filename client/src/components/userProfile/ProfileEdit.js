import React from 'react';
import { connect } from 'react-redux';
import ProfileEditForm from './ProfileEditForm';
import {  startSetUser } from '../../actions/user'


export class ProfileEdit extends React.Component {
  componentWillMount() {
    this.props.startSetUser(this.props.match.params.id)
  }

  render() {
    return (
      <div>
          <ProfileEditForm {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user.user
})

export default connect(mapStateToProps, { startSetUser })(ProfileEdit)
