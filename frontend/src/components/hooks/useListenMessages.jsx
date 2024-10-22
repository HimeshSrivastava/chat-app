import { useEffect,useContext  } from 'react';
import {SocketContex} from '../contex/SoketContex'
import useConversation from '../zustand/useConversation';


// const useListenMessages = () => {
//     const {socket}= useContext(SocketContex);
//     const {messages,setMessages}=useConversation();

//     useEffect(()=>{
//      socket?.on("newMessage",(newMessage)=>{
//            setMessages([...messages,newMessage]);
//      })

//      return()=> socket?.off("newMessage")
//     },[messages,setMessages,socket]);
// }

// export default useListenMessages
// import { useEffect, useContext } from 'react';
// import { SocketContext } from '../context/SocketContext.jsx';
// import useConversation from '../zustand/useConversation';

const useListenMessages = () => {
    const { socket } = useContext(SocketContex);
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // Use a functional update to ensure the latest state is used
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        // Listen for new messages
        socket?.on("newMessage", handleNewMessage);

        // Cleanup function to remove the listener
        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]); // Only include socket and setMessages as dependencies
};

export default useListenMessages;
