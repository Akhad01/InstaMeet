import React, { useEffect, useState } from 'react'

import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import { useProfessions } from '../../../hooks/useProfession'
import { useQualities } from '../../../hooks/useQualities'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false,
  })

  const [errors, setErrors] = useState({})

  const { professions } = useProfessions()

  const { qualities } = useQualities()

  const { signUp } = useAuth()

  const qualitiesList = qualities.map((quality) => ({
    label: quality.name,
    value: quality._id,
  }))

  const handleChange = (target) => {
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

    name: {
      isRequired: { message: 'Имя обязательно для заполнения' },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3,
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
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать сервис без потверждения лицензионного соглашения',
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

    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    }

    console.log('newData', newData)

    try {
      await signUp(newData)

      navigate('/')
    } catch (error) {
      setErrors(error)
    }
  }

  const arrayOfProfessions =
    professions &&
    Object.keys(professions).map((profession) => ({
      name: professions[profession].name,
      value: professions[profession]._id,
    }))

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
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
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
        option={arrayOfProfessions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
        label="Выберите свою профессию"
        name="profession"
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
        options={qualitiesList}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
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
