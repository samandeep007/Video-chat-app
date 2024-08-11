import React from 'react'
import { Outlet } from 'react-router-dom'
import { SocketContextProvider } from './context/Socket.jsx'

export default function App() {
  return (
    <SocketContextProvider>
    <Outlet/>
    </SocketContextProvider>
  )
}
