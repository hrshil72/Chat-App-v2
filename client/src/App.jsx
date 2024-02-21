import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import JoinPage from "./components/joinPage/JoinPage";
import ChatPage from "./components/chatPage/ChatPage";

const App = () => {
  const socket = io("http://localhost:8000/", { transports: ["websocket"] });

  socket.on("connect", () => {
    console.log("Connected");
  });

  return (
    <Routes>
      <Route path="/" element={<JoinPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
