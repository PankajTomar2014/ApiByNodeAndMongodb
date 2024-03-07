const express = require("express");
require("./Database/connection");
const StudentRouter = require("./Routing/StudentRoute");
const ChatRouter = require("./Routing/ChatRouting");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()); // Getting data in json from postman body.
app.use(StudentRouter); // All Student Routing.
// app.use(ChatRouter); // All Chat Router.

app.listen(port, () => {
  console.log(`Connection is running at port : ${port}`);
});
