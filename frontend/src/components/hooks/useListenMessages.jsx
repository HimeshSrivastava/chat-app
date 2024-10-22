import { useEffect,useContext  } from 'react';
import {SocketContex} from '../contex/SoketContex.jsx'
import useConversation from '../zustand/useConversation';


const useListenMessages = () => {
    const {socket}= useContext(SocketContex);
    const {messages,setMessages}=useConversation();

    useEffect(()=>{
     socket?.on("newMessage",(newMessage)=>{
           setMessages([...messages,newMessage]);
     })

     return()=> socket?.off("newMessage")
    },[messages,setMessages,socket]);
  return (
    <div>
      
    </div>
  )
}

export default useListenMessages