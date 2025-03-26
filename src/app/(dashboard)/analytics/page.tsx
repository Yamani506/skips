import { PageHeader } from "@/components/page-header";
import { AnalyticsDashboard } from "@/components/analytics/dashboard";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Analytics"
        description="Call center performance metrics and insights"
      />
      <AnalyticsDashboard />
    </div>
  );
}