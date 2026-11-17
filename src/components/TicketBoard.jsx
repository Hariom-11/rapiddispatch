
import TicketCard from "./TicketCard";

const sampleTickets = [
  {
    id: 105,
    title: "Truck breakdown on Route 66",
    description: "Delivery vehicle reported engine failure during transit.",
    customer: "Global Freight Ltd.",
    priority: "High",
    status: "Open",
  },
  {
    id: 106,
    title: "Missed delivery deadline",
    description: "Shipment did not arrive within the scheduled window.",
    customer: "Metro Logistics",
    priority: "Medium",
    status: "Open",
  },
  {
    id: 107,
    title: "Incorrect freight invoice",
    description: "Customer reported duplicate billing for shipment.",
    customer: "Swift Cargo",
    priority: "Low",
    status: "Open",
  },
];

export default function TicketBoard() {
  return (
    <section className="ticket-board">
      <div className="board-heading">
        <div>
          <h2>Active Tickets</h2>
          <p>Current support requests requiring attention</p>
        </div>
        <span className="ticket-count">{sampleTickets.length} Tickets</span>
      </div>

      <div className="ticket-grid">
        {sampleTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </section>
  );
}
