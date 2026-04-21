// ===== IMPORTS =====
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// ===== SETUP =====
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ===== CONFIG =====
const SERIAL_PORT = "/dev/ttyACM0"; // Ubuntu
const BAUD_RATE = 9600;
const PORT = 3000;

// ===== SERIAL =====
const port = new SerialPort({
  path: SERIAL_PORT,
  baudRate: BAUD_RATE,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// ===== STATIC =====
app.use(express.static("public"));

// ===== READ JSON DATA =====
parser.on("data", (data) => {
  try {
    const jsonData = JSON.parse(data);

    io.emit("sensorData", jsonData);

    console.log("📡", jsonData);
  } catch (err) {
    console.log("⚠ Invalid JSON:", data);
  }
});

// ===== START =====
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});