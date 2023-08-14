import './App.scss'
import Mytabs from './Components/Tabs/Mytabs'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { Dashboard } from './Components/Dashboard/Dashboard';

function App() {
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

  return (
    <div>
      <ToastContainer />
      <div className='tabContainer'>
        {/* <Mytabs  toast={notify}/> */}
        <Dashboard/>
      </div>
      
    </div>
  )
}

export default App
