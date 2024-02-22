const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = [{}];

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat ${users[socket.id]}`,
    });
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });
  });

  socket.on("message", ({message, id}) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
    console.log(`disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
