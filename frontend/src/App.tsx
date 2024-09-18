import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import AppRoutes from './router'
import "./index.css";
import { ToastContainer } from 'react-toastify';
import { LoadingProvider } from './components/FullScreenLoader/LoadingContext';

function App() {
  return (
    <>
     
      <LoadingProvider>
         <AppRoutes />
      </LoadingProvider>
      <ToastContainer
        position='top-right'
        hideProgressBar
        closeButton={false} />
    </>
  )
}

export default App;
