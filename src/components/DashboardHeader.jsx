
export default function DashboardHeader() {
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
        <span className="status-indicator"></span>
        <span>Dashboard Overview</span>
      </div>
    </header>
  );
}
