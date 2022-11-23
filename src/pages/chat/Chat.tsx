import { useAuth } from "@frontegg/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./chat.scss";
import ScrollToBottom from "react-scroll-to-bottom";
import penguin from "../../assets/Group.png";

const socket = io("ws://localhost:5001", { withCredentials: false });
export const Chat = () => {
  const { room } = useParams();
  type JoiningItems = {
    room: string;
    user: string;
  };
  type MessageListItem = {
    room: string;
    author: string;
    img: string;
    message: string;
    time: string;
  };

  const [messageList, setMessageList] = useState<MessageListItem[]>([]);
  const { user }: any = useAuth();
  const [newComers, setNewComers] = useState<JoiningItems[]>([]);
  const inputRef = useRef<null | HTMLInputElement>(null);
  console.log(newComers);
  useEffect(() => {
    socket.emit("join_room", { room: room, user: user.name }, (error: any) => {
      if (error) {
        alert(error);
      }
    });
  }, [room, user.name]);

  useEffect(() => {
    const joiningListener = (data: JoiningItems) => {
      if (
        newComers.find((user) => user.user !== data.user) ||
        newComers.length === 0
      ) {
        setNewComers((previous) => [...previous, data]);
      }
    };

    socket.on("receive_joining", joiningListener);

    const messageListener = (data: MessageListItem) => {
      setMessageList((previous) => [...previous, data]);
    };

    socket.on("receive_message", messageListener);

    return () => {
      socket.off("receive_message", messageListener);
      socket.off("receive_joining", joiningListener);
    };
  }, [newComers]);

  const sendMessage = () => {
    const message = inputRef.current?.value || "";
    if (message !== "") {
      const messageData = {
        room: room || "",
        author: user.name,
        img: user.profilePictureUrl,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", messageData);
      setMessageList((previous) => [...previous, messageData]);
      inputRef.current!.value = "";
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="chat">
      <div className="chat-top">
        <h1>Welcome to {room}</h1>
      </div>
      <div className="chat-middle">
        <div className="chat-section">
          <ScrollToBottom className="scroll">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {newComers.length > 0 ? (
                <span>
                  {newComers[newComers.length - 1].user} joined in chat
                </span>
              ) : null}
              {messageList.map((message, index) => {
                return (
                  <Fragment key={index}>
                    {message.author !== user.name ? (
                      <h2 style={{ fontFamily: "Exo", fontSize: "10px" }}>
                        {message.author}
                      </h2>
                    ) : null}

                    <div
                      className="msg"
                      style={
                        user.name === message.author
                          ? { justifyContent: "flex-end" }
                          : { justifyContent: "flex-start" }
                      }
                    >
                      {/* <img
                        alt="userImg"
                        style={{ width: "50px", height: "50px" }}
                        src={message.img}
                      /> */}

                      <div
                        className={
                          user.name === message.author
                            ? "sent-by-me"
                            : "sent-by-else"
                        }
                      >
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </ScrollToBottom>
        </div>

        <form className="chat-bottom" onSubmit={handleSubmit}>
          <input ref={inputRef} type="text" placeholder="Type Message..." />

          <img style={{ cursor: "pointer" }} src={penguin} alt="penguin" />
        </form>
      </div>
    </div>
  );
};
