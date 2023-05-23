import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Bookmark from '../common/bookmark'
import Qualities from './qualities/qualitiesList'
import { Table } from '../common/table'
import Profession from './profession'

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookmark,
  onDelete,
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    profession: {
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />,
    },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          bookmark={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      ),
    },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          delete
        </button>
      ),
    },
  }

  return (
    <Table
      onSort={onSort}
      columns={columns}
      data={users}
      selectedSort={selectedSort}
    />
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default UsersTable
