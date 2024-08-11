import {Children, createContext, useContext} from 'react';
import {io} from 'socket.io-client';


const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    const socket = useMemo(() => {
        io({
            host: "localhost",
            port: 8081
        }, [])
    })
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}
export const useSocket = () => useContext(SocketContext);
