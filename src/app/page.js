
import DashboardHeader from "@/components/DashboardHeader";
import TicketBoard from "@/components/TicketBoard";
import "@/styles/dashboard.css";

export default function Home() {
  return (
    <main className="dashboard-container">
      <DashboardHeader />
      <TicketBoard />
    </main>
  );
}
