import React, { useEffect, useState } from 'react'

import { validator } from '../../../utils/validator'
import api from '../../../api'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import { useNavigate, useParams } from 'react-router-dom'
import { useProfessions } from '../../../hooks/useProfession'
import { useQualities } from '../../../hooks/useQualities'
import { useAuth } from '../../../hooks/useAuth'

const UserUpdate = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const [errors, setErrors] = useState({})
  const params = useParams()
  const { userId } = params

  console.log('data', data)

  const { isLoading: professionLoading, professions } = useProfessions()

  const professionList = professions.map((quality) => ({
    label: quality.name,
    value: quality._id,
  }))

  const { isLoading: qualitiesLoading, qualities } = useQualities()
  const qualitiesList = qualities.map((quality) => ({
    label: quality.name,
    value: quality._id,
  }))

  const { currentUser } = useAuth()

  const history = useNavigate()

  const getProfessionById = (id) => {
    for (const prof in professions) {
      const profData = professions[prof]
      if (profData._id === id) return profData
    }
  }

  const getQualities = (elements) => {
    const qualitiesArray = []

    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality]._id) {
          qualitiesArray.push(qualities[quality])
        }
      }
    }

    return qualitiesArray
  }

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
    // return data.map((qual) => ({ label: qual.name, value: qual._id }))
  }

  useEffect(() => {
    setIsLoading(false)

    // updateUserDate()

    if (currentUser && !professionLoading && !qualitiesLoading && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities),
        profession: currentUser._id,
      })
    }
  }, [currentUser, professionLoading, qualitiesLoading, data])

  useEffect(() => {
    setIsLoading(false)
  }, [data])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) {
      return
    }

    const { profession, qualities } = data

    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => history(`/users/${data._id}`))
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
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

              {!professionLoading && (
                <SelectField
                  defaultOption="Choose..."
                  option={professionList}
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
