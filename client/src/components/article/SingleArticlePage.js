import React from 'react';
import {Link} from 'react-router-dom';

const SingleArticlePage = props => (
  <div>
    <h1>Single article</h1>
    <h3>{props.article.title}</h3>
    <p>{props.article.description}</p>
    <p>{props.article.price}</p>
    <p>
      {props.article.user === null
        ? 'deleted user'
        : props.article.user.username}
    </p>
    <Link className="button" to={`/article/${props.match.params.id}/edit`}>
      Edit
    </Link>
  </div>
);

export default SingleArticlePage;
