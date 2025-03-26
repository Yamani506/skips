import { PageHeader } from "@/components/page-header";
import { SettingsManager } from "@/components/settings/settings-manager";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Settings"
        description="Configure system-wide preferences and options"
      />
      <SettingsManager />
    </div>
  );
}