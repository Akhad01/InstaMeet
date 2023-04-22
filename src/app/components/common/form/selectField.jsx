import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  option,
  error,
  name,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClass = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }

  const optionsArray =
    !Array.isArray(option) && typeof option === 'object'
      ? Object.values(option)
      : option

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClass()}
        name={name}
        value={value}
        id={name}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectField.protoType = {
  defaultOption: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default SelectField
