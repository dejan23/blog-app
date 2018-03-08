import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ArticleListItem = ({ _id, title, price, description, created_at, user }) => (
    <Link className="c-card" to={`/article/${_id}`}>
      <div className="c-card__header">
         <img src="https://udemy-images.udemy.com/course/240x135/1286908_1773_4.jpg"  className="c-card__image" alt="Card Image" />
      </div>
      <div className="c-card__body">
        <h2 className="c-card__title">
        {title}
      </h2>
      <p className="c-card__subtitle">
        {moment(created_at).format('MMMM Do, YYYY')}, created by <strong>{user === null ? 'deleted user' : user.username}</strong>
      </p>

      <p className="c-card__intro">
         {description}
      </p>
      <div className="c-card__footer">
      {numeral(price).format('$0,0')}
      </div>
      </div>
    </Link>
)

export default ArticleListItem;
