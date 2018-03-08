import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const username = localStorage.getItem('username');

class Header extends React.Component {

  renderLinks() {
    if(this.props.authenticated) {
      return (
        <div className="auth">
          <Link className="header__username" to={`/user/${username}`}>Hello <span>{username}</span></Link>
          <Link className="button" to="/create">Post an article</Link>
          <Link className="button" to={`/user/${username}`}>Profile</Link>
          <Link className="button" to="/logout">Logout</Link>
        </div>
      )
    } else {
      return (
        <div  className="auth">
          <Link className="button" to="/create">Post an article</Link>
          <Link className="button" to="/login">Login</Link>
          <Link className="button button--register" to="/register" >Register</Link>
        </div>
      )
    }
  }


  render() {
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
              <ul>
                <li>
                  <Link className="header__brand" to="/">
                    <span>Blog</span>App
                  </Link>
                </li>
                <li>Categories</li>
              </ul>
              {this.renderLinks()}
          </div>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    email: state.auth.email,
    user: state.user
  }
}

export default connect(mapStateToProps)(Header);
