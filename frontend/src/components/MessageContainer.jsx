import { useEffect, useRef, useState } from "react";
import useConversation from "./zustand/useConversation";
import axios from "axios";
import { useAuthContex } from "./contex/AuthContex";
import { BACKEND_URL } from "./constant/Api";
import { useSocket } from "./contex/SoketContex";
import { TextField, Button, Box, Typography, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const MessageContainer = () => {
  const { socket } = useSocket();
  const { selectedConversation, setSelectedConversation, messages, setMessages } = useConversation();
  const messageRef = useRef(null);
  const { authUser } = useAuthContex(); 
  const [getMessage, setGetMessage] = useState([]);

  useEffect(() => {
    if (!socket || !selectedConversation) return;
    socket.emit("joinRoom", selectedConversation._id);

    return () => {
      socket.emit("leaveRoom", selectedConversation._id);
    };
  }, [socket, selectedConversation]);

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
        setMessages(res.data); 
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [selectedConversation, messages]);

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

      const res = await axios.post(`${BACKEND_URL}/api/message/send/${selectedConversation._id}`, messageData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.data) {
        setMessages((prev) => [...prev, res.data]); 
        socket.emit("sendMessage", res.data); 
      }

      messageRef.current.value = "";
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

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

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const decodedId=JSON.parse(atob(authUser?.token.split(".")[1]));

  return (
    <Box className="flex flex-col max-w-full h-screen p-4 bg-gray-100 space-y-4">
      {!selectedConversation ? (
        <NotSelected />
      ) : (
        <>
          <Paper elevation={3} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg shadow-lg max-h-screen sm:text-sm">
            {getMessage.length > 0 ? (
              getMessage.map((msg) => (
                <Box
                  key={msg._id}
                  className={`self-${msg.senderId === decodedId.userid ? "end" : "start"} max-w-xs px-4 py-2`}
                  sx={{
                    backgroundColor: msg.senderId === decodedId.userid ? "#1976d2" : "#e0e0e0",
                    color: msg.senderId === decodedId.userid ? "#fff" : "#000",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{msg?.message}</Typography>
                  <IconButton
                    onClick={() => deleteMessage(msg._id)}
                    sx={{ color: msg.senderId === decodedId.userid ? "#ff5252" : "#d32f2f" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Typography>No messages yet</Typography>
            )}
          </Paper>

          <Box className="mt-4 flex items-center" sx={{ gap: 2 }}>
            <TextField
              inputRef={messageRef}
              placeholder="Type a message..."
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
            />
            <Button
              onClick={sendMessage}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ backgroundColor: "#1976d2", ":hover": { backgroundColor: "#1565c0" } }}
            >
              Send
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MessageContainer;

const NotSelected = () => {
  const { authUser } = useAuthContex();
  return (
    <Box
      className="flex flex-col w-full max-w-xs h-screen p-4 space-y-4 items-center justify-center"
      sx={{ backgroundColor: "#f5f5f5", color: "#000" }}
    >
      <Typography variant="h5" fontWeight="bold">{`Welcome ${authUser?.name}`}</Typography>
    </Box>
  );
};
