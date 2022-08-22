import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io";
import { io } from "socket.io-client";
import "./chat.scss";

let socket: Socket;
export const Chat = () => {
  const [chatRoom, setChatRoom] = useState("");
  const [message, setMessage] = useState<any>("");
  const { room } = useParams();
  const [messages, setMessages] = useState<any>([]);
  console.log(messages);

  const socket = io("http://localhost:3001", { withCredentials: false });

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessages((prevMsg: [any]) => [...prevMsg, data.message]);
    });
  });

  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      socket.emit("send_message", { message: message });
    }
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
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Type Your Message Here..."
          />
        </div>
      </div>
    </div>
  );
};
