import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// -------------- validation ----------
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength45 = maxLength(45)
const requiredEmail = value => (value ? undefined : 'Please enter an email')
const requiredPassword = value => (value ? undefined : 'Please enter an password')
const requiredPasswordConfirm = value => (value ? undefined : 'Please enter an password confirmation')
const matchPassword = (value, values) => ( value === values.password ? undefined : 'Passwords must match')
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

class Register extends Component {

  componentWillUnmount() {
    return this.props.clearAlert();
  }

  submitForm = values => {
    // call action creator to sign up the user
    this.props.registerUser(values)
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
        <div className="box-layout__form-group">
          <label>Confirm password:</label>
          <Field
            validate={[requiredPasswordConfirm, matchPassword]}
            name="passwordConfirm"
            component={renderInput}
            type="password"
          />
        </div>

        {this.renderAlert()}
        <button className="button button--register" type="submit">Register</button>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
        <p>Haven't received confirmation token? <Link to='/auth/resend'>Resend token</Link></p>
      </div>
      </form>
    );
  }
}

// function validate(values) {
//   const errors = {};
//
//   if (!values.email) {
//     errors.email = 'Please enter an email';
//   }
//
//   if (!values.password) {
//     errors.password = 'Please enter an password';
//   }
//
//   if (!values.passwordConfirm) {
//     errors.passwordConfirm = 'Please enter an password confirmation';
//   }
//
//   if (values.password !== values.passwordConfirm) {
//     errors.passwordConfirm = 'passwords must match';
//   }
//
//   if ( values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address'
//   }
//
//   return errors;
// }

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Register = connect(mapStateToProps, actions)(Register);

export default reduxForm({
  form: 'registerForm'
  // validate: validate
})(Register);
