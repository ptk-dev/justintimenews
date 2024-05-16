const { WebSocketServer } = require("ws");
const fs = require("fs")

const files= fs.readdirSync("../")

let socket_server = new WebSocketServer({
  port: 29147,
});


socket_server.on("connection", async (socket) => {
  socket.send(JSON.stringify({
    type: "ask",
    question:
      "Summarize the life in 100 words",
  }));
  socket.on("message", (message)=> {
    console.log(message.toString())
  })
  console.log("Connected to processor");
});
