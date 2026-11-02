import {} from 'react'

import './App.css'
import { RouterProvider} from 'react-router-dom'
import Routes from './routes/Routes'
import { ToastContainer } from 'react-toastify/unstyled'

function App() {
  

  return (
    <>
     <div className='w-full'>
        <RouterProvider router={Routes} />
         <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </div>
    </>
  )
}

export default App
