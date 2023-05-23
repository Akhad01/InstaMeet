import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layout/users'
import Main from './layout/main'
import Login from './layout/login'
import NavBar from './components/ui/navBar'
import { ProfessionProvider } from '../hooks/useProfession'

import 'react-toastify/dist/ReactToastify.css'
import QualitiesProvider from '../hooks/useQualities'

function App() {
  return (
    <div className="App container">
      <NavBar />
      <Routes>
        <Route
          path="login/:type?"
          element={
            <ProfessionProvider>
              <QualitiesProvider>
                <Login />
              </QualitiesProvider>
            </ProfessionProvider>
          }
        />
        <Route
          path="users/:userId?/:edit?"
          element={
            <ProfessionProvider>
              <QualitiesProvider>
                <Users />
              </QualitiesProvider>
            </ProfessionProvider>
          }
        />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Main />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
