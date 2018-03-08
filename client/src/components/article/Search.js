import React from 'react';
import { Link } from 'react-router-dom';

const Search = () => (
  <div className="search">
    <div className="search__box">
      <h1>Welcome</h1>
      <input className="text-input text-input--search-bar" type="text" placeholder="what are you searching for..." />
      <button className="button button--white button--search">Search</button>
      <p className="secret"><Link  className="secret" to='/secret'>go see a secret...</Link></p>
      <Link to="/users" className="button button--white">List of all users</Link>

    </div>
  </div>

)

export default Search;
