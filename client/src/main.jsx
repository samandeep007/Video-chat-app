import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Home } from './pages/index.js'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App/>}>
    <Route path="" element={<Home/>}/>
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>      
  </StrictMode>,
)
