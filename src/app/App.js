import { Routes, Route } from 'react-router-dom'

import Users from './layout/users'
import Main from './layout/main'
import Login from './layout/login'
import NavBar from './components/navBar'
import User from './components/user'

function App() {
  return (
    <div className="App container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<User />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  )
}

export default App
