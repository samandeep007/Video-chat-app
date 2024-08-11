import {createContext, useContext, useMemo} from 'react';
import {io} from 'socket.io-client';


const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketContextProvider = ({children}) => {

    const socket = useMemo(() =>
        io("localhost:8088")
    )
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

