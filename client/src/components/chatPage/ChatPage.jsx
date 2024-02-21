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

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      console.log(data.message);
    });

    return () => {
      socket.emit(`disconnect`);
      socket.off();
    };
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
