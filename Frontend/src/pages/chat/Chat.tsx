import { useAuth } from "@frontegg/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./chat.scss";

const socket = io("ws://localhost:3001", { withCredentials: false });
export const Chat = () => {
  const [chatRoom, setChatRoom] = useState("");
  const [message, setMessage] = useState<any>("");
  const { room } = useParams();
  const [messages, setMessages] = useState<any>([]);
  const { user } = useAuth();
  useEffect(() => {
    // socket.on("recieve_message", (data) => {
    //   setMessages((prevMsg: [any]) => [...prevMsg, data.message]);
    // });

    socket.emit("join_room", { room }, (error: any) => {
      if (error) {
        alert(error);
      }
    });
  }, [room]);

  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (message !== "") {
      const messageData = {
        room: room,
        author: user.name,
        message: message,
        time: `${new Date(Date.now()).getHours()} ${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      await socket.emit("send_message", { message: messageData });
    }
    setMessage("");
  };

  return (
    <div className="chat">
      <div className="chat-top">
        <h1>Welcome to {room}</h1>
      </div>
      <div className="chat-middle">
        <div className="chat-bottom">
          <input
            onChange={handleMessage}
            type="text"
            value={message}
            placeholder="Type Your Message Here..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
