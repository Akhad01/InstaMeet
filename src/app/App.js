import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layout/users'
import Main from './layout/main'
import Login from './layout/login'
import NavBar from './components/ui/navBar'
import ProtectedRoute from './components/ui/protectedRoute'
import LogOut from './layout/logOut'
import AppLoader from './components/ui/hoc/appLoader'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <AppLoader>
        <NavBar />
        <Routes>
          <Route path="login/:type?" element={<Login />} />
          <Route
            path="/users/:userId?/:edit?"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </AppLoader>
      <ToastContainer />
    </div>
  )
}

export default App
