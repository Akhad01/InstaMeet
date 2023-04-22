import React, { useEffect, useState } from 'react'
import SelectField from './form/selectField'
import TextAreaField from './form/textareaField'
import { validator } from '../../utils/validator'
import api from '../../api'

const initialData = { userId: '', content: '' }

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData)
  const [users, setUsers] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => {
      return { ...prevState, [target.name]: target.value }
    })
  }

  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Выберите от чьего имени вы хотите отправить сообщение',
      },
    },
    content: {
      isRequired: {
        message: 'Сообщение не может быть пустым',
      },
    },
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    api.users.fetchAll().then(setUsers)
  }, [])

  const clearForm = () => {
    setData(initialData)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      name: users[userId].name,
      value: users[userId]._id,
    }))

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          defaultOption="Выберите пользователя"
          option={arrayOfUsers}
          onChange={handleChange}
          value={data.userId}
          name="userId"
          error={errors.userId}
        />
        <TextAreaField
          value={data.content}
          label="Сообщение"
          name="content"
          onChange={handleChange}
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Опубликовать</button>
        </div>
      </form>
    </div>
  )
}

export default AddCommentForm
