import React, { useEffect, useState } from 'react'

import { validator } from '../../utils/validator'
import api from '../../api'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
  })

  const [qualities, setQualities] = useState({})
  const [errors, setErrors] = useState({})
  const [professions, setProfession] = useState()

  useEffect(() => {
    api.professions().then((data) => setProfession(data))
    api.qualities().then((data) => setQualities(data))
  }, [])

  const handleChange = (target) => {
    setData((prevState) => {
      console.log('prevState', prevState)
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
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию',
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

      <SelectField
        defaultOption="Choose..."
        option={professions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
        label="Выберите свою профессию"
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Famele', value: 'famale' },
          { name: 'Other', value: 'other' },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите свой пол"
      />
      <MultiSelectField
        onChange={handleChange}
        options={qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        submit
      </button>
    </form>
  )
}

export default RegisterForm
