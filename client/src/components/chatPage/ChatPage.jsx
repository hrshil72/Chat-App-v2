import React, { useEffect, useState } from "react";
import { user } from "../joinPage/JoinPage";
import { io } from "socket.io-client";
import send from "../../assets/send.png";

let socket;

const ChatPage = () => {
  let [id, setId] = useState("");

  const send = () => {
    const message = document.getElementById("chatInput").value;

    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = io("http://localhost:8000/", { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("Connected");
      setId(socket.id);
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

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      console.log(data.user, data.message, data.id);
    });

    return () => {};
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">
            <img src={send} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
