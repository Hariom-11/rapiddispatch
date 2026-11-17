
export default function DashboardHeader({ isConnected }) {
  return (
    <header className="dashboard-header">
      <div>
        <p className="dashboard-eyebrow">RapidDispatch / Support</p>
        <h1>Support Dashboard</h1>
        <p className="dashboard-subtitle">
          Manage and monitor active freight support tickets.
        </p>
      </div>

      <div className="header-status">
        <span
          className={`status-indicator ${
            isConnected ? "status-online" : "status-offline"
          }`}
        ></span>
        <span>{isConnected ? "Live Connected" : "Disconnected"}</span>
      </div>
    </header>
  );
}
