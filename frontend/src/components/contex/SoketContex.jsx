import { createContext, useEffect, useState } from "react";
import { useAuthContex } from "./AuthContex";
import { io } from "socket.io-client";


export const SocketContex = createContext(); // Correct casing

export const SocketContexProvider = ({ children }) => {  
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const { authUser } = useAuthContex();

    useEffect(() => {
        if (authUser) {
            const socketInstance = io("http://localhost:4000",{
                query: {
                    userId:authUser._id,
                }
            }); 
            setSocket(socketInstance);
            socketInstance.on(("getOnlineUsers"),(users)=>{
                 setOnlineUsers(users);
            })

            return () => socketInstance.close(); // Cleanup on unmount
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContex.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContex.Provider>
    );
};                    