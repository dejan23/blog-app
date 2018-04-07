import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSetUserUpdate } from '../../actions/user';


const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="input" {...input} placeholder={placeholder} type={type} />
      {touched &&
       error &&
       <div className="error">{error}</div>}
    </div>
  </div>
)

class ProfileEditForm extends Component {
  componentDidMount() {
     this.handleInitialize();
  }

  handleInitialize() {
    this.props.initialize(this.props.initialValues);
  }

  submitForm = async values => {
    this.props.startSetUserUpdate(values)
  }

  render() {
    const { handleSubmit } = this.props;
    const usernameFromStorage = localStorage.getItem('username');

    return (
      <form className="box-layout" onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div className="box-layout__box">
        <div className="box-layout__form-group">
          <h2>Edit your profile</h2>
          <Field
            name="email"
            type="text"
            component={renderField}
            label="Email address"
          />
        </div>
        <div className="box-layout__form-group">
          <Field
            name="username"
            type="text"
            component={renderField}
            label="Username"
          />
        </div>
        <div className="box-layout__form-group">
          <Field
            name="location"
            type="text"
            component={renderField}
            label="Location"
          />
        </div>
        <div className="box-layout__form-group">
          <Field
            name="city"
            type="text"
            component={renderField}
            label="City"
          />
        </div>
        <div className="profile__button">
          <Link className="button" type="button" to={`/users/${usernameFromStorage}`}>Cancel</Link>
        <button type="submit" className="button button--register">Save</button>
        </div>
      </div>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (props.match.params.id) {
    return {
      initialValues: props.user
    }
  }
  return { initialValues: null }
}

ProfileEditForm = connect(mapStateToProps, { startSetUserUpdate })(ProfileEditForm);


export default reduxForm({
  form: 'profile-edit', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ProfileEditForm)
