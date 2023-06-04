import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'

const NavProfile = () => {
  const { currentUser } = useAuth()
  const [isOpen, setOpen] = useState(false)

  console.log('current', currentUser)

  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>

        <img
          className="img-responsive rounded-circle"
          src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`}
          height="40"
          alt=""
        />
      </div>

      <div className={`w-100 dropdown-menu ${isOpen ? 'show' : ''}`}>
        <Link to={`users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="logout" className="dropdown-item">
          Logout
        </Link>
      </div>
    </div>
  )
}

export default NavProfile
