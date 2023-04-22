import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = ({ onChange, label, name, error, value }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClass = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        className={getInputClass()}
        id={name}
        onChange={handleChange}
        name={name}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextAreaField.protoType = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
}

export default TextAreaField
