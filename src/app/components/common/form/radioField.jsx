import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ options, name, onChange, value, label }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div>
        {options.map((option) => {
          return (
            <div
              className="form-check form-check-inline"
              key={option.name + '_' + option.value}
            >
              <input
                className="form-check-input"
                type="radio"
                name={name}
                id={option.name + '_' + option.value}
                checked={option.value === value}
                onChange={handleChange}
                value={option.value}
              />
              <label
                className="form-check-label"
                htmlFor={option.name + '_' + option.value}
              >
                {option.name}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

RadioField.protoType = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
}

export default RadioField
