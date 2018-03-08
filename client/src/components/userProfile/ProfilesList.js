import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ProfilesList = ({ username, email, created_at, avatar }) => (
    <Link className="list-item" to={`/user/${username}`}>
      <div className="list-item__avatar-title">
        <div  className="list-item__avatar">
          <img src={avatar || 'https://image.ibb.co/bUv8k7/NoImage.png'} />
        </div>
        <div>
        <h3 className="list-item__title">{username}</h3>
        <span className="list-item__sub-title">{email}</span>
        <br />
        <span className="list-item__sub-title">List of articles: X</span>

        </div>
      </div>
      <div>
        <h4 className="list-item__joined">{moment(created_at).format('MMMM Do, YYYY')}</h4>
      </div>
    </Link>
)

export default ProfilesList;
