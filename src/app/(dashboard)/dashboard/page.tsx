import { MetricsGrid } from "@/components/metrics-grid";
import { UserTable } from "@/components/user-table";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Dashboard"
        description="Call center analytics and user management overview"
      />
      <MetricsGrid />
      <UserTable />
    </div>
  );
}