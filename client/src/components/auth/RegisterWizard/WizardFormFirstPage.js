import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import { Link } from 'react-router-dom';


class WizardFormFirstPage extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="box-layout" onSubmit={handleSubmit}>
        <div className="box-layout__box">
        <div className="box-layout__form-group">
          <h2>Register a new account</h2>
          <Field
            name="email"
            type="text"
            component={renderField}
            label="Email address"
          />
        </div>
        <div className="box-layout__form-group">
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
          />
        </div>
        <div className="box-layout__form-group">

          <Field
            name="passwordConfirm"
            type="password"
            component={renderField}
            label="Confirm password"
          />
        </div>

        <button type="submit" className="button button--register">
          Get started
        </button>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
        <p>Haven't received confirmation token? <Link to='/auth/resend'>Resend token</Link></p>
      </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: true, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)
