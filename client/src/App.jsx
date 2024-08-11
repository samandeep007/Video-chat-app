import React from "react";
import { Outlet } from "react-router-dom";
import { SocketContextProvider } from "./context/Socket.jsx";
import { PeerContextProvider } from "./context/Peer.jsx";

export default function App() {
  return (
    <SocketContextProvider>
      <PeerContextProvider>
        <Outlet />
      </PeerContextProvider>
    </SocketContextProvider>
  );
}
