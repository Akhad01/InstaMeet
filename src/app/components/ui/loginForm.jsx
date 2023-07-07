import React, { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/users'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const location = useLocation()

  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)

  const handleChange = (target) => {
    setData((prevState) => {
      return { ...prevState, [target.name]: target.value }
    })

    setEnterError(null)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()

    if (!isValid) {
      return
    }

    const redirect = location.state ? location.state.from : '/'

    dispatch(login(data, redirect, navigate))
  }

  return (
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>

      {enterError && <p className="text-danger">{enterError}</p>}

      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid || enterError}
      >
        submit
      </button>
    </form>
  )
}

export default LoginForm
