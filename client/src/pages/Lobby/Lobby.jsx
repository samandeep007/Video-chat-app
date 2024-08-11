import React, { useCallback, useEffect } from "react";
import { useSocket } from "../../context/Socket";
import { usePeer } from "../../context/Peer";
export default function Lobby() {
  const { socket } = useSocket();
  const {peer, createOffer} = usePeer();

  const handleUserJoined = useCallback(async({email}) => {
        console.log(`User: ${email} joined the room!`);
        const offer = await createOffer();
        socket.emit('call-user', {email, offer});
  }, [socket, peer])

  const handleIncomingCall = ({from, offer}) => {
    console.log("Incoming call from ", offer);
  }

  useEffect(() => {
    socket.on("user-joined", handleUserJoined);
    socket.on('incomming-call', handleIncomingCall);

    return () => {
        socket.off('user-joined', handleUserJoined);
        socket.off('incomming-call', handleIncomingCall);
    }
  }, [socket]);

  return (
    <>
      <div>Lobby</div>
    </>
  );
}
