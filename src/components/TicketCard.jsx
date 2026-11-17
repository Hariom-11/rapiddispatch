
export default function TicketCard({ ticket }) {
  return (
    <article className="ticket-card">
      <div className="ticket-card-top">
        <span className="ticket-id">#{ticket.id}</span>
        <span className={`priority priority-${ticket.priority.toLowerCase()}`}>
          {ticket.priority}
        </span>
      </div>

      <h3>{ticket.title}</h3>
      <p className="ticket-description">{ticket.description}</p>

      <div className="ticket-card-footer">
        <span>{ticket.customer}</span>
        <span className="ticket-status">{ticket.status}</span>
      </div>
    </article>
  );
}
