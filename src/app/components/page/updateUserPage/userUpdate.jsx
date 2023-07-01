import React, { useEffect, useState } from 'react'

import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import { useNavigate } from 'react-router-dom'
import { useQualities } from '../../../hooks/useQualities'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from '../../../store/professions'

const UserUpdate = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const [errors, setErrors] = useState({})

  const professions = useSelector(getProfessions())

  const professionsLoading = useSelector(getProfessionsLoadingStatus())

  const professionsList = professions.map((quality) => ({
    label: quality.name,
    value: quality._id,
  }))

  const { isLoading: qualitiesLoading, qualities } = useQualities()
  const qualitiesList = qualities.map((quality) => ({
    label: quality.name,
    value: quality._id,
  }))

  const { currentUser, updateUserDate } = useAuth()

  const navigate = useNavigate()

  function getQualitiesListById(qualitiesIds) {
    const qualitiesArray = []

    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality)

          break
        }
      }
    }

    return qualitiesArray
  }

  const transformData = (data) => {
    return getQualitiesListById(data).map((qual) => ({
      label: qual.name,
      value: qual._id,
    }))
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) {
      return
    }

    await updateUserDate({
      ...data,
      qualities: data.qualities.map((quality) => quality.value),
    })

    navigate(`/users/${currentUser._id}`)
  }

  useEffect(() => {
    if (currentUser && !professionsLoading && !qualitiesLoading && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities),
        profession: currentUser._id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, professionsLoading, qualitiesLoading, data])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data, isLoading])

  const isValid = Object.keys(errors).length === 0

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professionsList).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                type="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />

              {!professionsLoading && (
                <SelectField
                  defaultOption="Choose..."
                  option={professionsList}
                  onChange={handleChange}
                  value={data.profession}
                  error={errors.profession}
                  label="Выберите свою профессию"
                  name="profession"
                />
              )}
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
              {!qualitiesLoading && (
                <MultiSelectField
                  onChange={handleChange}
                  options={qualitiesList}
                  defaultValue={data.qualities}
                  name="qualities"
                  label="Выберите ваши качества"
                />
              )}
              <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
              >
                Обновить
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}

export default UserUpdate
