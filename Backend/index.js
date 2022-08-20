const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// prevent getting errors while connecting
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http:// localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("Welcome to server");
});
