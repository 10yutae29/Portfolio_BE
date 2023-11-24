const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;

server.listen(PORT);

io.on("connection", (socket) => {
  console.log("소켓 연결됨");

  // 소켓 통신 이벤트 처리
  socket.on("chatmsg", (msg) => {
    io.emit("chat message", msg); // 모든 클라이언트에게 메시지 전송
  });

  socket.on("enterWorld", (msg) => {
    io.emit("otherPlayer", msg);
  });
  socket.on("updateState", (msg) => {
    io.emit("updateState", msg);
  });
  socket.on("giveYourInfo", (msg) => {
    io.emit("giveYourInfo", msg);
  });
  socket.on("quit", (msg) => {
    io.emit("quit", msg);
  });
});

app.get("/", function (req, res) {
  res.send("hihi");
});
