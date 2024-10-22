import React from 'react'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { store } from './app/store.ts'
import App from './App.tsx'
import AdminRoute from './components/AdminRoute'
import About from './pages/About/index.tsx'
import Admin from './pages/Admin/index.tsx'
import Contacts from './pages/Contacts/index.tsx'
import Home from './pages/Home/index.tsx'
import Login from './pages/Login/index.tsx'
import NotFound from './pages/NotFound/index.tsx'
import Portfolio from './pages/Portfolio/index.tsx'
import Profile from './pages/Profile/index.tsx'
import Register from './pages/Register/index.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'portfolio', element: <Portfolio /> },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
)
