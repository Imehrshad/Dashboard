import './App.scss'
import Mytabs from './Components/Tabs/Mytabs'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { useState } from 'react';

function App() {
  const [isloggedin, setLoggedIn] = useState(false)
  const [username, setUsername] = useState()
  const notify = () => toast.success("Your register was successfull !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    className: 'toast-message',
    icon: <FaCheckCircle className="custom-toast-icon" />
  });
  const getUsername = (username) => {
    setLoggedIn(true)
    setUsername(username)
  }
  const logout = () => {
    setLoggedIn(false)
  }

  return (
    <div >
      <ToastContainer />
      {isloggedin && <Dashboard userInfo={username} logout={logout} />}
      <div className='tabContainer'>
        {!isloggedin && <Mytabs toast={notify} Username={getUsername} />}

      </div>
    </div>

  )
}

export default App
