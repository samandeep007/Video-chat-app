import React from 'react'
import { Outlet } from 'react-router-dom'
import { SocketContextProvider } from './context/socket'

export default function App() {
  return (
    <SocketContextProvider>
    <Outlet/>
    </SocketContextProvider>
  )
}
