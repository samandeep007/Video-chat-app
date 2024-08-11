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

  return <PeerContext.Provider value={{peer, createOffer}}>{children}</PeerContext.Provider>;
};
