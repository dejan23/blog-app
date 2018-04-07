const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.email) {
    errors.email = 'Please enter an email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.sex) {
    errors.sex = 'Required'
  }
  if (!values.favoriteColor) {
    errors.favoriteColor = 'Required'
  }
  if (!values.password) {
    errors.password = 'Please enter an password'
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an password confirmation'
  }
  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords must match'
  }
  return errors
}

export default validate
