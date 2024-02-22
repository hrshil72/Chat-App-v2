import React, { useEffect, useState } from "react";
import { user } from "../joinPage/JoinPage";
import { io } from "socket.io-client";
import send from "../../assets/send.png";
import Chat from "../chat/Chat";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;

const ChatPage = () => {
  let [id, setId] = useState("");
  let [message, setMessage] = useState([]);

  const sendMessage = () => {
    const message = document.getElementById("chatInput").value;

    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  console.log(message);
  useEffect(() => {
    socket = io("http://localhost:8000/", { transports: ["websocket"] });

    socket.on("connect", () => {
      // alert("Connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessage([...message, data]);
      console.log(data.message);
    });

    return () => {
      socket.emit(`disconnect`);
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [message]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
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
          <input type="text" id="chatInput" />
          <button onClick={sendMessage} className="sendBtn">
            <img src={send} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
