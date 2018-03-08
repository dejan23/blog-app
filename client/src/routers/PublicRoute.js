import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated && props.match.path === '/login' ||
    isAuthenticated && props.match.path === '/register' ||
    isAuthenticated && props.match.path === '/register/success' ||
    isAuthenticated && props.match.path === '/auth/verify/:token' ||
    isAuthenticated && props.match.path === '/auth/resend' ||
    !isAuthenticated && props.match.path === '/logout'
     ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Component {...props}/>
      </div>
    )
  )}/>
)

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.authenticated
})

export default connect(mapStateToProps)(PublicRoute)








// import React from 'react'
// import { Route, Redirect } from 'react-router-dom'
// import Header from '../components/Header';
//
// export const PublicRoute = ({
//   component: Component,
//   ...rest
// }) => (
//   <Route {...rest} component={(props) => (
//     <div>
//       <Header />
//       <Component {...props}/>
//       {console.log(props)}
//     </div>
//   )}/>
// )
//
// export default PublicRoute;
