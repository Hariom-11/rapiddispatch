
require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const tickets = require("./data/tickets");

const app = express();
const server = http.createServer(app);

const PORT = Number(process.env.PORT) || 5001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "RapidDispatch backend is running",
  });
});

app.get("/api/tickets", (req, res) => {
  res.status(200).json({
    success: true,
    tickets,
  });
});

app.post("/api/tickets", (req, res) => {
  const { title, description, customer, priority } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    typeof customer !== "string" ||
    !customer.trim() ||
    !["High", "Medium", "Low"].includes(priority)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid ticket information",
    });
  }

  const newTicket = {
    id: tickets.length
      ? Math.max(...tickets.map((ticket) => ticket.id)) + 1
      : 1,
    title: title.trim(),
    description: description.trim(),
    customer: customer.trim(),
    priority,
    status: "Open",
  };

  tickets.unshift(newTicket);

  io.emit("ticket:created", newTicket);

  return res.status(201).json({
    success: true,
    ticket: newTicket,
  });
});

io.on("connection", (socket) => {
  console.log(`Agent connected: ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`Agent disconnected: ${socket.id} (${reason})`);
  });
});

server.listen(PORT, () => {
  console.log(`RapidDispatch server running on http://localhost:${PORT}`);
});
