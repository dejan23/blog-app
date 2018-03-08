import React from 'react'

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

export default renderField
