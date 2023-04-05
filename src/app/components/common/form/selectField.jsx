import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  option,
  error,
}) => {
  const getInputClass = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }

  const optionsArray =
    !Array.isArray(option) && typeof option === 'object'
      ? Object.keys(option).map((optionName) => ({
          name: option[optionName].name,
          value: option[optionName]._id,
        }))
      : option

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={getInputClass()}
        name="profession"
        value={value}
        id="validationCustom04"
        onChange={onChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option._id} value={option._id}>
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
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default SelectField
