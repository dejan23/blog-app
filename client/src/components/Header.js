import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const emailInfo = localStorage.getItem('email');

class Header extends React.Component {

  renderLinks() {
    if(this.props.authenticated) {
      return (
        <div>
          <Link className="header__username" to="#">Logged in as <strong>{this.props.email || emailInfo}</strong></Link>
          <Link className="button " to="#">Profile</Link>
          <Link className="button " to="/logout">Logout</Link>
        </div>
      )
    } else {
      return (
        <div>
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
              <div>
                <Link className="header__brand" to="/">
                  <h1>Blog App</h1>
                </Link>
              </div>
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
    email: state.auth.email
  }
}

export default connect(mapStateToProps)(Header);
