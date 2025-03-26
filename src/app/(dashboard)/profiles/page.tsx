import { PageHeader } from "@/components/page-header";
import { ProfilesGrid } from "@/components/profiles/profiles-grid";

export default function ProfilesPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Agent Profiles"
        description="Manage call center agent profiles and permissions"
      />
      <ProfilesGrid />
    </div>
  );
}