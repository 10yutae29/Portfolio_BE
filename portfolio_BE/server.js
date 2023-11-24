const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

io.on("connection", (socket) => {
  console.log("소켓 연결됨");
  console.log(socket.id);
  // console.log(socket);

  // 소켓 통신 이벤트 처리
  socket.on("chatmsg", (msg) => {
    io.emit("chat message", msg); // 모든 클라이언트에게 메시지 전송
  });

  socket.on("enter", (msg) => {});

  socket.on("disconnect", (msg, aa) => {
    console.log("소켓 연결 해제됨", msg);
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
  io.on("outWorld", (msg) => {
    io.emit("outWorld", msg);
    console.log("나가나가");
  });
  socket.on("quit", (msg) => {
    console.log(msg, "hoho");
    io.emit("quit", msg);
  });
});

app.get("/", function (req, res) {
  res.send("hihi");
});
