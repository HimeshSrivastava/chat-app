import { useEffect, useRef, useState } from "react";
import useConversation from "./zustand/useConversation";
import axios from "axios";
import { useAuthContex } from "./contex/AuthContex";
import useListenMessages from "./hooks/useListenMessages";
import { useContext } from "react";
import { SocketContex } from "./contex/SoketContex";
import { BACKEND_URL } from "./constant/Api";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation, messages, setMessages } = useConversation();
  const {onlineUsers,socket}=useContext(SocketContex);
 
  const messageRef = useRef(null);
  const [getMessage, setGetMessage] = useState(null);
  useListenMessages();

  console.log(selectedConversation);

  const sendMessage = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("chat-User"));

      if (!user || !user.token) {
        console.error("No token found");
        return;
      }

      const token = user.token;
      const messageData = {
        message: messageRef.current.value,
      };

      const res = await axios.post(`${BACKEND_URL}/api/message/send/${selectedConversation._id}`, 
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (res.error) {
        throw new Error("Message not sent");
      }

      socket.emit("newMessage", res.data); 
      setGetMessage([...getMessage, res.data]);
      setMessages([...messages, res.data]); 
      messageRef.current.value = ''; 
    } catch (error) {
      console.log(error);
    }
  };


  const getMessages = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("chat-User"));
  
      if (!user || !user.token) {
        console.error("No token found");
        return;
      }
  
      const token = user.token;
  
      const messageres = await axios.get(`${BACKEND_URL}/api/message/${selectedConversation._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      if (messageres.error) {
        throw new Error("Message not sent");
      }
  
      setGetMessage(messageres.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const user = JSON.parse(localStorage.getItem("chat-User"));
  
      if (!user || !user.token) {
        console.error("No token found");
        return;
      }
  
      const token = user.token;

      const formattedMessageId = messageId.toString();;

  
      await axios.delete(`${BACKEND_URL}/api/message/delete/${formattedMessageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


  
      // Remove the message locally
      setGetMessage((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
     
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  
  

  useEffect(() => {
    if (selectedConversation) {
      getMessages(); 
    }
  }, [selectedConversation]); 

  useEffect(() => {
    return () => setSelectedConversation(null); 
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {!selectedConversation ? <NotSelected /> : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow">
            {getMessage && getMessage.length > 0 ? (
              getMessage.map((msg) => (
                <div
                  key={msg._id}
                  className={`self-${msg.senderId === 'you' ? 'end' : 'start'} max-w-xs px-4 py-2 ${
                    msg.senderId === 'you' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  } rounded-lg flex justify-between`}
                >
                  {msg?.message}
                   <button
               onClick={() => deleteMessage(msg._id)}
               className=" text-red-500"
                 >
              Delete
               </button>
                </div>
              ))
            ) : (
              <p>No messages yet</p> 
            )}
          </div>

          <div className="mt-4 flex items-center">
            <input
              ref={messageRef}
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NotSelected = () => {
  const { authUser } = useAuthContex();
  return (
    <div className="flex flex-col w-[300px] max-w-xs h-screen bg-slate-300 p-4 space-y-4 items-center justify-center">
      <p className="font-bold text-xl">{`Welcome ${authUser?.name}`}</p>
    </div>
  );
};