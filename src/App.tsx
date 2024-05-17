
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'

// pages
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import Loading from './components/Loading'
import Message from './components/Message'


// context 
import { UserProvider } from './context/UserContext';


function App() {

  return (
    <Router>
        <UserProvider>
          <Loading/>
          <Message/>
          <Routes>
              <Route path='/login' element={ <Login/>}/>
              <Route path='/profile' element={ <Profile/>}/>
              <Route path='/' element={<Login/>}/>
          </Routes>
        </UserProvider>
    </Router> 
  )
}

export default App
