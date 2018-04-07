import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearAlert } from '../../../actions/auth';
import { addFlashMessage } from '../../../actions/flashMessages';

const gender = [ 'Male', 'Female' ]
const renderGenderSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select your gender...</option>
      {gender.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)

const month = [ 'January', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
const renderMonthSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">month...</option>
      {month.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)

const location = [ 'Belgrade', 'New York', 'Boston', 'Los Angeles', 'San Francisco', 'Palo Alto', 'Chicago', 'Miami', 'Washington DC', 'Astin', 'Atlanta', 'Sun Valley' ]
const renderLocationSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">location...</option>
      {location.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)

class WizardFormSecondPage extends Component {
  componentWillUnmount() {
    return this.props.clearAlert();
  }

  submitForm = values => {
    this.props.addFlashMessage({
      type: 'success',
      message: 'You registered successfully. Please check your email inbox to activate account!'
    })
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
    const { handleSubmit, previousPage, pristine, submitting } = this.props;


    return (
      <form className="box-layout" onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div className="box-layout__box">
        <div className="box-layout__form-group">
          <h2>hope you have a nice day</h2>
          <Field
            name="firstName"
            type="text"
            component={renderField}
            label="First Name*"
          />
        </div>
        <div className="box-layout__form-group">
          <Field
            name="lastName"
            type="text"
            component={renderField}
            label="Last Name*"
          />
        </div>
        <div className="box-layout__form-group">
          <Field
            name="username"
            type="text"
            component={renderField}
            label="Username*"
          />
        </div>
        <div className="box-layout__form-group-input">
          <label>Your gender</label>
          <Field name="gender" component={renderGenderSelector}/>
        </div>

        <label>Your birthday</label>
        <div className="box-layout__form-group-special">
          <div className="flex-grid">
            <div className="col">
              <Field name="month" component={renderMonthSelector}/>
            </div>
            <div className="col">
              <Field
                name="day"
                type="text"
                component={renderField}
                placeholder="day"
              />
            </div>
            <div className="col">
              <Field
                className="item"
                name="year"
                type="text"
                component={renderField}
                placeholder="year"
              />
            </div>
          </div>
        </div>

        <div className="box-layout__form-group-input">
          <label>Your location</label>
          <Field name="location" component={renderLocationSelector}/>
        </div>

        {this.renderAlert()}

        <button type="button" className="button" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting} className="button button--register">
          Submit registration
        </button>

      </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

WizardFormSecondPage = connect(mapStateToProps, { registerUser, addFlashMessage, clearAlert })(WizardFormSecondPage);

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage)
