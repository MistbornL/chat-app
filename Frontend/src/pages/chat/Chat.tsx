import { useAuth } from "@frontegg/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./chat.scss";

export const Chat = () => {
  const [chatRoom, setChatRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { room } = useParams();
  console.log(room);

  const { user } = useAuth();
  console.log(user);

  //   socket.on("recieve_message", (data) => {
  //     alert(data.message);
  // }
  var socket: any;
  useEffect(() => {
    const socket = io("http://localhost:3001", { withCredentials: false });
    socket.emit("join", { room });
  });

  return (
    <div className="chat">
      <div className="chat-top">
        <h1>Welcome to {room}</h1>
      </div>
      <div className="chat-middle"></div>
      <div className="chat-bottom"></div>
    </div>
  );
};
