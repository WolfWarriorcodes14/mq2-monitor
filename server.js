const express = require("express");
const path = require("path");

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Web server running on port", PORT);
});