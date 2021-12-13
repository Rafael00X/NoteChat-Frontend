import React, { useState, useEffect, useContext, createContext } from "react";
import io from "socket.io-client";

const URL = "http://localhost:9000";

const SocketContext = createContext();
function useSocketContext() {
    return useContext(SocketContext);
}

function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState();
    useEffect(() => {
        const newSocket = io(URL, { query: { id } });
        setSocket(newSocket);
        return () => newSocket.close();
    }, [id]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export { useSocketContext, SocketProvider };
