import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import ProfilePage from './ProfilePage';
import NotFoundPage from '../NotFoundPage';
import LoadingPage from '../LoadingPage';

class Profile extends React.Component {
  componentWillMount() {
     this.props.startSetUser(this.props.match.params.id)
  }
  render() {
    if(this.props.loading) {
      return <LoadingPage />
    }
    return(
      <div>
        {
          this.props.user && this.props.match.params.id ?
          <ProfilePage {...this.props}/> :
          <NotFoundPage />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user.user,
  loading: state.user.userIsLoading
})

export default connect(mapStateToProps, actions)(Profile)
