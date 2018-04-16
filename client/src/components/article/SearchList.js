import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const SearchList = ({ _id, title, price, description, picture, createdAt, author }) => (
  <Link className="list-item" to={`/article/${_id}`}>
    <div className="list-item__content">
      <div  className="list-item__avatar">
        <img src={picture || 'https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png'} />
      </div>
      <div className="">
      <h3 className="list-item__title">{title}</h3>
      <span className="list-item__description">{description}</span>
      <br />
      <br />
      <span className="list-item__price">Price: {numeral(price).format('$0,0')}</span>
      <br />
      <span className="">Location: {author === null ? <i>location not added</i> : author.location}</span>
      </div>
    </div>
    <div className="list-item__content--info">
      <p className="list-item__joined">{moment(createdAt).format('lll')},
        <br />
        <span>by <strong>{author === null ? 'deleted author' : author.username}</strong></span>
      </p>
    </div>
  </Link>
)

export default SearchList;
