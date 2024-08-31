import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './utils/Store.js'
import Loader from './components/Loader.jsx';



const Login = lazy(() => import('./components/Authentication/Login.jsx'));
const Signup = lazy(() => import('./components/Authentication/Signup.jsx'));




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<Loader />}>
            <Signup />
          </Suspense>
        )
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)