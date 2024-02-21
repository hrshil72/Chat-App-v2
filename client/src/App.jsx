import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:8000/", { transports: ["websocket"] });

  socket.on("connect", () => {
    console.log("Connected");
  });

  return (
    <>

    <div>App</div>

    <Routes>
        <Route path="/" element={ } />
      <Route/>
    </Routes>
    </>
  );
};

export default App;
