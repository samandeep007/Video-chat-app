import { createContext, useContext, useMemo } from "react";

const PeerContext = createContext();

export const usePeer = () => useContext(PeerContext);

export const PeerContextProvider = ({ children }) => {
  const peer = useMemo(() => 
    new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    }), []);

  const createOffer = async() => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  }

  const createAnswer = async(offer) => {
    await peer.setRemoteDescription(offer); //Uski decription yaad krli uske basis par answer bna diya
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  }

  const setRemoteAnswer = async(answer) => {
    await peer.setRemoteDescription(answer);
  }

  const sendStream = async(stream) => {
    const tracks = stream.getTracks();
    
  }

  return <PeerContext.Provider value={{peer, createOffer, createAnswer, setRemoteAnswer}}>{children}</PeerContext.Provider>;
};
