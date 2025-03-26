import { TimelineView } from "@/components/timeline-view";
import { PageHeader } from "@/components/page-header";

export default function VoiceLogsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Voice Logs"
        description="Review and manage call recordings and voice interactions"
      />
      <TimelineView />
    </div>
  );
}