import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import Pagination from '../../common/pagination'

import { paginate } from '../../../utils/paginate'
import { useSelector } from 'react-redux'
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from '../../../store/professions'
import { getCurrentUserId, getUsers } from '../../../store/users'

const UsersListPage = () => {
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())

  const users = useSelector(getUsers())

  const currentUserId = useSelector(getCurrentUserId())

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchQuery, setSearchQuery] = useState('')

  const pageSize = 8

  const handleDelete = (userId) => {
    console.log(userId)
  }

  const handleToggleBookmark = (id) => {
    const elementIndex = users.findIndex((elem) => elem._id === id)

    const newBookmark = [...users]
    newBookmark[elementIndex].bookmark = !newBookmark[elementIndex].bookmark
  }

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

  function filterUsers(data) {
    const filteredUsers = searchQuery
      ? data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : selectedProf
      ? data.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf._id)
        )
      : data
    return filteredUsers.filter((u) => u._id !== currentUserId)
  }

  const filteredUsers = filterUsers(users)

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

  const count = filteredUsers.length

  const userCrop = paginate(sortedUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf()
  }

  return (
    <div className="d-flex">
      {professions && !professionsLoading && (
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

export default UsersListPage
