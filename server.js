const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend
app.use(express.static("public"));

// Dummy sensor data (for cloud demo)
setInterval(() => {
  const a0 = Math.floor(Math.random() * 800);
  const d0 = a0 > 400 ? 1 : 0;

  io.emit("sensorData", { a0, d0 });
}, 2000);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});