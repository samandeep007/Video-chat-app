import React, { useCallback, useEffect } from "react";
import { useSocket } from "../../context/Socket";
import { usePeer } from "../../context/Peer";
export default function Lobby() {
  const { socket } = useSocket();
  const {peer, createOffer, createAnswer} = usePeer();

  const handleUserJoined = useCallback(async({email}) => {
        console.log(`User: ${email} joined the room!`);
        const offer = await createOffer();
        socket.emit('call-user', {email, offer});
  }, [socket, peer])

  const handleIncomingCall = useCallback(async({from, offer}) => {
    console.log("Incoming call from ", offer);
    const answer = await createAnswer(offer);
    socket.emit('call-accepted', {email: from, answer })
  }, [createAnswer, socket])

  const handleCallAccepted = useCallback(async({answer}) => {

  }, [])

  useEffect(() => {
    socket.on("user-joined", handleUserJoined);
    socket.on('incomming-call', handleIncomingCall);
    socket.on('call-accepted', handleCallAccepted);

    return () => {
        socket.off('user-joined', handleUserJoined);
        socket.off('incomming-call', handleIncomingCall);
        socket.off('call-accepted', handleCallAccepted);
    }
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted]);

  return (
    <>
      <div>Lobby</div>
    </>
  );
}
