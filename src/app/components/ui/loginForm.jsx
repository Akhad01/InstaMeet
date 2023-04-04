import React, { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
    setData((prevState) => {
      return { ...prevState, [target.name]: target.value }
    })
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательно для заполнения' },
      isEmail: {
        message: 'Email введен некоректно',
      },
    },

    password: {
      isRequired: {
        message: 'Пароль обязательно для заполнения',
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      },
      isCapitalDigit: {
        message: 'Пароль должен содержать хотя бы одно число',
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8,
      },
    },
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()

    if (!isValid) {
      return
    }
  }

  console.log('isValid', isValid)

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Пароль"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />

            <button
              className="btn btn-primary w-100 mx-auto"
              type="submit"
              disabled={!isValid}
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
