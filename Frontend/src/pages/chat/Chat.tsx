import { useAuth } from "@frontegg/react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import "./chat.scss";

const socket = io("ws://localhost:3001", { withCredentials: false });
export const Chat = () => {
  const [message, setMessage] = useState<any>("");
  const { room } = useParams();
  const [messageList, setMessageList] = useState<any>([]);
  const { user } = useAuth();

  useEffect(() => {
    socket.emit("join_room", { room }, (error: any) => {
      if (error) {
        alert(error);
      }
    });
  }, [room]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list: any) => [...list, data]);
    });
  }, []);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: user.name,
        img: user.profilePictureUrl,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list: any) => [...list, messageData]);
      setMessage("");
    }
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat">
      <div className="chat-top">
        <h1>Welcome to {room}</h1>
      </div>
      <div className="chat-middle">
        <div className="chat-section">
          {messageList.map((message: any, index: number): any => {
            return (
              <Fragment key={index}>
                <span>{message.time}</span>
                <div className="msg">
                  <img
                    alt="userimg"
                    style={{ width: "50px", height: "50px" }}
                    src={message.img}
                  />
                  <p>{message.message}</p>
                </div>
              </Fragment>
            );
          })}
        </div>

        <div className="chat-bottom">
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            value={message}
            placeholder="Type Your Message Here..."
            onKeyDown={handleEnter}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
