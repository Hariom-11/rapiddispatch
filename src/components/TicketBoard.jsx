
import TicketCard from "./TicketCard";

export default function TicketBoard({ tickets, loading, error }) {
  return (
    <section className="ticket-board">
      <div className="board-heading">
        <div>
          <h2>Active Tickets</h2>
          <p>Current support requests requiring attention</p>
        </div>

        <span className="ticket-count">{tickets.length} Tickets</span>
      </div>

      {loading ? (
        <p className="board-message">Loading tickets...</p>
      ) : error ? (
        <p className="board-message board-error">{error}</p>
      ) : tickets.length === 0 ? (
        <p className="board-message">No active tickets available.</p>
      ) : (
        <div className="ticket-grid">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </section>
  );
}
