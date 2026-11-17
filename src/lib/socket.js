
import { io } from "socket.io-client";

const SERVER_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const socket = io(SERVER_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});
