import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./chat.scss";
import ScrollToBottom from "react-scroll-to-bottom";
import penguin from "../../assets/Group.png";

const socket = io("ws://localhost:5001", { withCredentials: false });

export const Chat = () => {
  const { room } = useParams();
  const [messageList, setMessageList] = useState<MessageListItem[]>([]);
  const { user } = useParams();
  const [newComers, setNewComers] = useState<JoiningItems[]>([]);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const bottomRef = useRef<null | HTMLInputElement>(null);
  const handleScroll = (ref: any) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  type JoiningItems = {
    room: string;
    user: string;
  };

  type MessageListItem = {
    room: string;
    author: string | undefined;
    message: string;
    time: string;
  };

  useEffect(() => {
    socket.emit("join_room", { room: room, user: user }, (error: any) => {
      if (error) {
        alert(error);
      }
    });
  }, [room, user]);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const sendMessage = () => {
    const message = inputRef.current?.value || "";
    if (message !== "") {
      const messageData = {
        room: room || "",
        author: user,
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
    <main style={{ padding: "2rem" }}>
      <div style={{ marginTop: "4rem", borderRadius: "5px" }} className="chat">
        <div className="chat-top">
          <h1>Welcome to {room}</h1>
        </div>
        <div className="chat-middle">
          <div className="chat-section" ref={bottomRef}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "auto",
              }}
            >
              {newComers.length > 0 ? (
                <span>
                  {newComers[newComers.length - 1].user} joined in chat
                </span>
              ) : null}
              {messageList.map((message, index) => {
                return (
                  <Fragment key={index}>
                    {message.author !== user ? (
                      <h2 style={{ fontFamily: "Exo", fontSize: "10px" }}>
                        {message.author}
                      </h2>
                    ) : null}

                    <div
                      className="msg"
                      style={
                        user === message.author
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
                          user === message.author
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
          </div>

          <form className="chat-bottom" onSubmit={handleSubmit}>
            <input
              className="form-control"
              ref={inputRef}
              type="text"
              placeholder="Type Message..."
            />

            <img
              onClick={() => sendMessage()}
              style={{ cursor: "pointer" }}
              src={penguin}
              alt="penguin"
            />
          </form>
        </div>
      </div>
    </main>
  );
};
