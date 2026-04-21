const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// 🔥 Temporary dummy data (for cloud)
setInterval(() => {
  const a0 = Math.floor(Math.random() * 800);
  const temp = (25 + Math.random() * 10).toFixed(1);
  const hum = (50 + Math.random() * 20).toFixed(1);

  let status = "NORMAL";
  if (a0 > 500) status = "GAS_LEAK";
  if (a0 > 650) status = "FIRE";

  io.emit("sensorData", {
    mq2_1: a0,
    mq2_2: a0 - 50,
    avgGas: a0,
    temp: temp,
    hum: hum,
    status: status
  });

}, 2000);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});