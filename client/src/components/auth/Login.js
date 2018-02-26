import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';


// -------------- validation ----------
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength45 = maxLength(45)
const requiredEmail = value => (value ? undefined : 'Please enter an email')
const requiredPassword = value => (value ? undefined : 'Please enter an password')
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
// -------------- end validation --------

const renderInput = field =>
  <div>
    <input className="input" {...field.input} type={field.type}/>
    {field.meta.touched &&
     field.meta.error &&
     <div className="error">{field.meta.error}</div>}
  </div>

class Login extends React.Component {

  componentWillUnmount() {
    return this.props.clearAlert();
  }

  submitForm = values => {
    this.props.loginUser(values);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (

      <form className="box-layout" onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div className="box-layout__box">
        <div className="box-layout__form-group">
          <label>Email:</label>
          <Field
            validate={[requiredEmail, email, maxLength45]}
            name="email"
            component={renderInput}
            type="text"
          />
        </div>
        <div className="box-layout__form-group">
          <label>Password:</label>
          <Field
            validate={requiredPassword}
            name="password"
            component={renderInput}
            type="password"
          />
        </div>

        {this.renderAlert()}
          <button className="button button--login" type="submit">Login</button>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
      </form>

    );
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Login = connect(mapStateToProps, actions)(Login);

export default reduxForm({
  form: 'login-form'
})(Login)
