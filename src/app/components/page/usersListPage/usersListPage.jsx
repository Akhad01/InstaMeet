import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import Pagination from '../../common/pagination'

import api from '../../../api'
import { paginate } from '../../../utils/paginate'

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState(api.professions())
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchQuery, setSearchQuery] = useState('')

  const pageSize = 8

  const [users, setUsers] = useState()

  useEffect(() => {
    api.users().then((data) => {
      return setUsers(data)
    })
  }, [])

  const handleDelete = (userId) => {
    const userData = users.filter((user) => user._id !== userId)
    setUsers(userData)
  }

  const handleToggleBookmark = (id) => {
    const elementIndex = users.findIndex((elem) => elem._id === id)
    const newBookmark = [...users]
    newBookmark[elementIndex].bookmark = !newBookmark[elementIndex].bookmark
    setUsers(newBookmark)
  }

  useEffect(() => {
    api.professions().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handleProfessinSelect = (item) => {
    if (searchQuery !== '') {
      setSearchQuery('')
    }
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const handleSearchQuery = ({ target }) => {
    setSelectedProf()
    setSearchQuery(target.value)
  }

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const count = filteredUsers.length

    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessinSelect}
            />
            <button className="btn btn-success mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}

        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchQuery}
            value={searchQuery}
            name="searchQuery"
            className="form-control my-4"
          />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return 'loading...'
}

export default UsersListPage
