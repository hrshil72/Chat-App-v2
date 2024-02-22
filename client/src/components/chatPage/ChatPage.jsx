import React, { useEffect, useState } from "react";
import { user } from "../joinPage/JoinPage";
import { io } from "socket.io-client";
import send from "../../assets/send.png";
import Chat from "../chat/Chat";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeChat from "../../assets/closeIcon.png";
import { Link } from "react-router-dom";

let socket;

const ChatPage = () => {
  let [id, setId] = useState("");
  let [message, setMessage] = useState([]);

  const sendMessage = () => {
    const message = document.getElementById("chatInput").value;

    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = io("https://chat-app-v2-2c59.onrender.com", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessage([...message, data]);
    });

    socket.on("userJoined", (data) => {
      setMessage([...message, data]);
    });

    socket.on("leave", (data) => {
      setMessage([...message, data]);
    });

    return () => {
      socket.emit(`disconnect`);
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage([...message, data]);
    });

    return () => {
      socket.off();
    };
  }, [message]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Lets Chat</h2>
          <a href="/">
            <img src={closeChat} />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {message.map((item, index) => {
            return (
              <Chat
                key={index}
                user={item.id === id ? "" : item.user}
                message={item.message}
                classs={item.id === id ? "right" : "left"}
              />
            );
          })}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={sendMessage} className="sendBtn">
            <img src={send} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
