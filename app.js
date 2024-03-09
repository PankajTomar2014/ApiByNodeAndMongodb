const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
var colors = require("colors");

const app = express();
const server = http.createServer(app); // Move this line after creating the express app
const port = process.env.PORT || 8000;

const io = socketIo(server);

require("./Database/connection");
const StudentRouter = require("./Routing/StudentRoute");
const ChatRouter = require("./Routing/ChatRouting");

io.on("connection", (socket) => {
  console.log("Socket connected".green.bold);

  socket.on("disconnect", () => {
    console.log("Socket disconnected".green.bold);
  });
});

app.use(express.json()); // Getting data in JSON from Postman body.
app.use(StudentRouter); // All Student Routing.
app.use(ChatRouter); // All Chat Router.
app.use(cors());

server.listen(port, () => {
  console.log(`Connection is running at port : ${port}`.yellow.bold);
});
