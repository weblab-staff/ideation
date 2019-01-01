const express = require("express");
const path = require("path");
const pug = require("pug");
const app = express();

const PORT = 3000;

// Setting up Views and Directories
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/static", express.static(path.join(__dirname, "public")));

// Socket handlers
let http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  socket.on("user input", idea => {
    let partial = pug.renderFile("views/idea.pug", { idea: idea });
    io.emit("new idea", partial);
  });
});

app.get("/", (req, res) => {
  res.render("send");
});

app.get("/ideas", (req, res) => {
  res.render("index");
});

http.listen(PORT);
