import React from 'react'
import { Link } from 'react-router-dom'

const navList = [
  { id: '1', value: 'Main', path: '/' },
  { id: '2', value: 'Login', path: 'login' },
  { id: '3', value: 'Users', path: 'users' },
]

const NavBar = () => {
  return (
    <ul className="nav">
      {navList.map((list) => {
        return (
          <li key={list.id} className="nav-item">
            <Link
              to={list.path}
              className="nav-link"
              aria-current="page"
              href="#"
            >
              {list.value}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavBar
