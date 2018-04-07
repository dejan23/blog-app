import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div className="not-found-page">
      <div className="not-found-page__box">
        <h1 className="not-found-page__title ">Sorry!</h1>
        <h5 className="not-found-page__text">We can't find the page you're looking for.</h5>
        <p className="not-found-page__text">(404) - <Link className="not-found-page--text" to="/">Go home</Link></p>
      </div>
    </div>
  )

export default NotFoundPage;
