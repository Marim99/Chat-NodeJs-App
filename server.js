const path = require("path");
const fs = require("fs");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { FormatMessage } = require("./modules/FormatMessage");

let activeUser;
const chatPage = fs.readFileSync("./public/chat.html").toString();
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 7000 || process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("new connection...");
  socket.emit("message", new FormatMessage("Hi", `welcome ${activeUser}`));
  socket.on("chat", (msg) => {
    io.emit("message", new FormatMessage("User", msg));
  });
  socket.on("disconnect", () => {
    io.emit("message", new FormatMessage("user", "user has left"));
  });
});
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "/favicon.ico"));
});
app.post("/chat.html", (req, res) => {
  console.log(req.body);
  activeUser = req.body.username;
  res.send(chatPage);
  io.emit("username", req.body.username);
});
server.listen(PORT, () => console.log(`server on port ${PORT}`));
