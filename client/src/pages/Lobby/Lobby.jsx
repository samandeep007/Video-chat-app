import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/Socket";
import { usePeer } from "../../context/Peer";
import ReactPlayer from 'react-player';
export default function Lobby() {
  const { socket } = useSocket();
  const {peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream} = usePeer();
  const[myStream, setMyStream] = useState(null);
  const[remoteEmailId, setRemoteEmailId] = useState(null);
  

  const handleUserJoined = useCallback(async({email}) => {
        console.log(`User: ${email} joined the room!`);
        const offer = await createOffer();
        socket.emit('call-user', {email, offer});
        setRemoteEmailId(email);
  }, [socket, peer])

  const handleIncomingCall = useCallback(async({from, offer}) => {
    console.log("Incoming call from ", offer);
    const answer = await createAnswer(offer);
    socket.emit('call-accepted', {email: from, answer })
    setRemoteEmailId(from)
  }, [createAnswer, socket])

  const handleCallAccepted = useCallback(async({answer}) => {
    await setRemoteAnswer(answer);
    console.log("Call got accepted", answer)
  }, [setRemoteAnswer, sendStream])

  const getUserMediaStream = useCallback(async() => {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    setMyStream(stream);
  }, [setMyStream])

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

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream])

  const handleNegotiation = useCallback(() => {
    const localOffer = peer.localDescription;
    socket.emit('call-user', {email: remoteEmailId, offer: localOffer});
  }, [peer.localDescription, remoteEmailId, socket])


  useEffect(() => {
    peer.addEventListener('negotiationneeded', handleNegotiation)
    return () => {
        peer.removeEventListener('negotiationneeded', handleNegotiation)
    }
  })

  return (
    <>
      <h1>Lobby</h1>
      <h4>You are connected to {remoteEmailId}</h4>
      <button onClick={(() => sendStream(myStream))}>Send my video</button>
      <ReactPlayer url={myStream} playing/>
      <ReactPlayer url={remoteStream} playing/>
    </>
  );
}
