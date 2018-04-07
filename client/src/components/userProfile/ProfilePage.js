import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const renderMessage = <i style={{fontWeight: 'normal', color: '#ff6565'}}>not added</i>

const ProfilePage = props => {
  const {user} = props;

  return (
    <div className="section">
      <div className="profile__header">
        <div className="profile__name">
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <h3>{user.email}</h3>
        </div>
      </div>
      <div className="profile__content">
            <div className="photo-container">
              <div className="photo">
                <img src={user.avatar || 'https://image.ibb.co/bUv8k7/NoImage.png'} />
              </div>
            </div>
            <div className="profile__info">
              <p>Username: <strong>{user.username}</strong></p>
              <li>Email: <strong>{user.email}</strong></li>
              <li>Location: <strong>{user.location}</strong></li>
              <li>City: <strong>{user.city || renderMessage}</strong></li>
              <li>Birthday: <strong>{`${user.day} ${user.month}, ${user.year}`}</strong></li>
              <li>Gender: <strong>{user.gender}</strong></li>
              <li>Joined: <strong>{moment(user.created_at).format('MMMM Do, YYYY')}</strong></li>
              <li>Number of articles: <strong>{user.articles.length}</strong></li>
            </div>
            <Link style={{textDecoration: 'none'}} to={`/users/${user.username}/articles`}>
              <h3 style={{color: '#ea5252'}}>Show all articles</h3>
            </Link>

            <div className="profile__button">
              <Link className="button" to={`/users/${user.username}/edit`}>
                Edit
              </Link>
              <Link to="/users" className="button">List of all users</Link>
            </div>
      </div>
    </div>
  );
};

export default ProfilePage;
