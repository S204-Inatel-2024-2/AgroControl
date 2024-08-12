import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import AppRoutes from './router'
import "./index.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position='top-center'
        hideProgressBar
        closeButton={false} />
    </>
  )
}

export default App;
