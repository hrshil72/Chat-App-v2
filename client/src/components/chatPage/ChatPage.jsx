import React, { useEffect } from "react";
import { user } from "../joinPage/JoinPage";
import { io } from "socket.io-client";
import send from "../../assets/send.png";

const ChatPage = () => {
  const socket = io("http://localhost:8000/", { transports: ["websocket"] });

  useEffect(() => {
    socket.on("connect", () => {
      // alert("Connected");
    });
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button className="sendBtn">
            <img src={send} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
