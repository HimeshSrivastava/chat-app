// import { useEffect, useRef, useState } from "react";
// import useConversation from "./zustand/useConversation";
// import axios from "axios";
// import { useAuthContex } from "./contex/AuthContex";
// import useListenMessages from "./hooks/useListenMessages";

// // import { SocketContex } from "./contex/SoketContex";
// import { BACKEND_URL } from "./constant/Api";
// import { useSocket } from "./contex/SoketContex";

// const MessageContainer = () => {
//   const {socket}=useSocket();
//   const { selectedConversation, setSelectedConversation, messages, setMessages } = useConversation();
//   // const { onlineUsers, socket } = useContext(SocketContex);

//   const messageRef = useRef(null);
//   const [getMessage, setGetMessage] = useState(null);
//   useListenMessages();

//   useEffect(() => {
//     if (!socket) return;

//     socket.emit("joinRoom", selectedConversation._id);

//     socket.on("receiveMessage", (newMessage) => {
//       setMessages((prev) => [...prev, newMessage]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [socket, selectedConversation]);

//   const sendMessage = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("chat-User"));

//       if (!user || !user.token) {
//         console.error("No token found");
//         return;
//       }

//       const token = user.token;
//       const messageData = {
//         message: messageRef.current.value,
//       };

//       const res = await axios.post(`${BACKEND_URL}/api/message/send/${selectedConversation._id}`, 
//         messageData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.error) {
//         throw new Error("Message not sent");
//       }

//       socket.emit("sendMessage", messageData);
//       setGetMessage([...getMessage, res.data]);
//       setMessages([...messages, res.data]);
//       messageRef.current.value = '';
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getMessages = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("chat-User"));
  
//       if (!user || !user.token) {
//         console.error("No token found");
//         return;
//       }
  
//       const token = user.token;
  
//       const messageres = await axios.get(`${BACKEND_URL}/api/message/${selectedConversation._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       if (messageres.error) {
//         throw new Error("Message not sent");
//       }
  
//       setGetMessage(messageres.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   const deleteMessage = async (messageId) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("chat-User"));

//       if (!user || !user.token) {
//         console.error("No token found in localStorage");
//         return;
//       }
      
//       const token = user.token;
//       const formattedMessageId = messageId.toString();
  
//       await axios.delete(`${BACKEND_URL}/api/message/delete/${formattedMessageId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });

//       setGetMessage((prevMessages) =>
//         prevMessages.filter((msg) => msg._id !== messageId)
//       );
//     } catch (error) {
//       console.error("Error deleting message:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedConversation) {
//       getMessages(); 
//     }
//   }, [selectedConversation]);

//   useEffect(() => {
//     return () => setSelectedConversation(null);
//   }, [setSelectedConversation]);

//   return (
//     <div className="flex flex-col max-w-full h-screen p-4 bg-gray-100 space-y-4">
//       {!selectedConversation ? <NotSelected /> : (
//         <>
//           <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-lg max-h-screen sm:text-sm">
//             {getMessage && getMessage.length > 0 ? (
//               getMessage.map((msg) => (
//                 <div
//                   key={msg._id}
//                   className={`self-${msg.senderId === 'you' ? 'end' : 'start'} max-w-xs px-4 py-2 ${
//                     msg.senderId === 'you' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                   } rounded-lg flex justify-between`}
//                 >
//                   {msg?.message}
//                   <button
//                     onClick={() => deleteMessage(msg._id)}
//                     className="text-red-500"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet</p>
//             )}
//           </div>

//           <div className="mt-4 flex items-center">
//             <input
//               ref={messageRef}
//               type="text"
//               placeholder="Type a message..."
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button 
//               onClick={sendMessage} 
//               className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//               Send
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MessageContainer;

// const NotSelected = () => {
//   const { authUser } = useAuthContex();
//   return (
//     <div className="flex flex-col w-full max-w-xs h-screen bg-slate-300 p-4 space-y-4 items-center justify-center">
//       <p className="font-bold text-xl">{`Welcome ${authUser?.name}`}</p>
//     </div>
//   );
// };
import { useEffect, useRef, useState } from "react";
import useConversation from "./zustand/useConversation";
import axios from "axios";
import { useAuthContex } from "./contex/AuthContex";
import { BACKEND_URL } from "./constant/Api";
import { useSocket } from "./contex/SoketContex";

const MessageContainer = () => {
  const { socket } = useSocket();
  const { selectedConversation, setSelectedConversation, messages, setMessages } = useConversation();
  const messageRef = useRef(null);
  const { authUser } = useAuthContex(); // Get logged-in user
  const [getMessage, setGetMessage] = useState([]);

  // ✅ Join and leave room on conversation change
  useEffect(() => {
    if (!socket || !selectedConversation) return;

    socket.emit("joinRoom", selectedConversation._id);

    return () => {
      socket.emit("leaveRoom", selectedConversation._id);
    };
  }, [socket, selectedConversation]);

  // ✅ Listen for real-time incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket]);

  // ✅ Fetch messages when a conversation is selected
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (!selectedConversation) return;
        const user = JSON.parse(localStorage.getItem("chat-User"));
        if (!user?.token) return;

        const res = await axios.get(`${BACKEND_URL}/api/message/${selectedConversation._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setGetMessage(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [selectedConversation]);

  // ✅ Send a message (Socket.IO + API)
  const sendMessage = async () => {
    try {
      if (!selectedConversation || !messageRef.current.value) return;

      const user = JSON.parse(localStorage.getItem("chat-User"));
      if (!user?.token) return;

      const messageData = {
        senderId: authUser._id,
        receiverId: selectedConversation._id,
        message: messageRef.current.value,
      };

      // ✅ Send message to backend first
      const res = await axios.post(`${BACKEND_URL}/api/message/send/${selectedConversation._id}`, messageData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.data) {
        setMessages((prev) => [...prev, res.data]); // Update local messages
        socket.emit("sendMessage", res.data); // Send message via Socket.IO
      }

      messageRef.current.value = "";
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  // ✅ Delete a message
  const deleteMessage = async (messageId) => {
    try {
      const user = JSON.parse(localStorage.getItem("chat-User"));
      if (!user?.token) return;

      await axios.delete(`${BACKEND_URL}/api/message/delete/${messageId}`, {
        headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
      });

      setGetMessage((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // ✅ Clean up selected conversation when component unmounts
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col max-w-full h-screen p-4 bg-gray-100 space-y-4">
      {!selectedConversation ? (
        <NotSelected />
      ) : (
        <>
          {/* ✅ Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-lg max-h-screen sm:text-sm">
            {getMessage.length > 0 ? (
              getMessage.map((msg) => (
                <div
                  key={msg._id}
                  className={`self-${msg.senderId === authUser._id ? "end" : "start"} max-w-xs px-4 py-2 ${
                    msg.senderId === authUser._id ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded-lg flex justify-between`}
                >
                  {msg?.message}
                  <button onClick={() => deleteMessage(msg._id)} className="text-red-500">
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No messages yet</p>
            )}
          </div>

          {/* ✅ Message Input */}
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
    <div className="flex flex-col w-full max-w-xs h-screen bg-slate-300 p-4 space-y-4 items-center justify-center">
      <p className="font-bold text-xl">{`Welcome ${authUser?.name}`}</p>
    </div>
  );
};
