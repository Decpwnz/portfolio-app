import React from 'react'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { store } from './app/store.ts'
import App from './App.tsx'
import AdminRoute from './components/AdminRoute'
import PrivateRoute from './components/PrivateRoute.tsx'
import About from './pages/About/index.tsx'
import Contacts from './pages/Contacts/index.tsx'
import Home from './pages/Home/index.tsx'
import Login from './pages/Login/index.tsx'
import NotFound from './pages/NotFound/index.tsx'
import Portfolio from './pages/Portfolio/index.tsx'
import Profile from './pages/Profile/index.tsx'
import ProjectDetail from './pages/ProjectDetail/index.tsx'
import Register from './pages/Register/index.tsx'

import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contacts', element: <Contacts /> },
        { path: 'portfolio', element: <Portfolio /> },
        { path: 'portfolio/:id', element: <ProjectDetail /> },
        {
          path: 'admin',
          element: (
            <PrivateRoute>
              <AdminRoute />
            </PrivateRoute>
          ),
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {
          path: 'profile',
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.PROD ? '/portfolio-app' : '/',
  }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
)
