import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearAlert } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flashMessages';

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
    return new Promise(resolve => {
      this.props.registerUser(values)
      return new Promise(resolve => {
        this.props.addFlashMessage({
          type: 'success',
          message: 'You registered successfully. Please check your email inbox to activate account!'
        })
     })
   })
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
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form className="box-layout" onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div className="box-layout__box">
        <div className="box-layout__form-group">
          <h2>Register a new account</h2>
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
        <button className="button button--register" type="submit" disabled={pristine || submitting}>Register</button>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
        <p>Haven't received confirmation token? <Link to='/auth/resend'>Resend token</Link></p>
      </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Register = connect(mapStateToProps, { registerUser, addFlashMessage, clearAlert })(Register);

export default reduxForm({
  form: 'registerForm'
  // validate: validate
})(Register);
