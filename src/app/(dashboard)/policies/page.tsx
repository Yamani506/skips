import { PageHeader } from "@/components/page-header";
import { PoliciesManager } from "@/components/policies/policies-manager";

export default function PoliciesPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Voice Policies"
        description="Configure and manage voice recognition and call handling policies"
      />
      <PoliciesManager />
    </div>
  );
}