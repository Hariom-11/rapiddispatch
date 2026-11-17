
"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import TicketBoard from "@/components/TicketBoard";
import { socket } from "@/lib/socket";
import "@/styles/dashboard.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [newTicketIds, setNewTicketIds] = useState([]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const handleConnect = () => {
      if (active) {
        setIsConnected(true);
      }
    };

    const handleDisconnect = () => {
      if (active) {
        setIsConnected(false);
      }
    };

    const handleNewTicket = (newTicket) => {
      if (!active) return;

      setTickets((previousTickets) => {
        if (previousTickets.some((ticket) => ticket.id === newTicket.id)) {
          return previousTickets;
        }

        return [newTicket, ...previousTickets];
      });

      setNewTicketIds((previousIds) => [
        ...previousIds,
        newTicket.id,
      ]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("ticket:created", handleNewTicket);

    socket.connect();

    if (socket.connected) {
      handleConnect();
    }

    const fetchTickets = async () => {
      try {
        const response = await fetch(`${API_URL}/api/tickets`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load tickets");
        }

        const data = await response.json();

        if (!data.success || !Array.isArray(data.tickets)) {
          throw new Error("Invalid tickets response");
        }

        if (active) {
          setTickets((previousTickets) => {
            const ticketMap = new Map();

            data.tickets.forEach((ticket) => {
              ticketMap.set(ticket.id, ticket);
            });

            previousTickets.forEach((ticket) => {
              ticketMap.set(ticket.id, ticket);
            });

            return Array.from(ticketMap.values()).sort(
              (a, b) => b.id - a.id
            );
          });

          setError("");
        }
      } catch (err) {
        if (active && err.name !== "AbortError") {
          setError("Unable to load tickets. Please try again later.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchTickets();

    return () => {
      active = false;
      controller.abort();

      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("ticket:created", handleNewTicket);
      socket.disconnect();
    };
  }, []);

  return (
    <main className="dashboard-container">
      <DashboardHeader isConnected={isConnected} />

      <TicketBoard
        tickets={tickets}
        loading={loading}
        error={error}
        newTicketIds={newTicketIds}
      />
    </main>
  );
}
