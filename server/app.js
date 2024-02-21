const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

io.on("connection", (socket) => {
  console.log("New connection");
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
