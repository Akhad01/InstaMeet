import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import User from './user'
import api from '../api/index'
import { paginate } from '../utils/paginate'
import GroupList from './groupList'
import SearchStatus from '../components/searchStatus'

const Users = ({ users, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState(api.professions())
  const [selectedProf, setSelectedProf] = useState()

  const pageSize = 4

  useEffect(() => {
    api.professions().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessinSelect = (item) => {
    console.log('item', item)
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users

  const count = filteredUsers.length

  const userCrop = paginate(filteredUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf()
  }

  return (
    <div className="d-flex justify-content-between">
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
        {count > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {userCrop.map((user) => {
                return <User key={user._id} {...rest} {...user} />
              })}
            </tbody>
          </table>
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

export default Users
