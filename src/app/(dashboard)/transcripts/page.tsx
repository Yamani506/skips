import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { columns } from "./columns";

const transcripts = [
  {
    id: "1",
    date: "2024-01-15",
    agent: "Sarah Wilson",
    customer: "John Doe",
    duration: "5:23",
    sentiment: "Positive",
  },
  {
    id: "2",
    date: "2024-01-15",
    agent: "Michael Chen",
    customer: "Jane Smith",
    duration: "3:45",
    sentiment: "Neutral",
  },
  {
    id: "3",
    date: "2024-01-14",
    agent: "Emma Davis",
    customer: "Robert Johnson",
    duration: "8:12",
    sentiment: "Negative",
  },
  {
    id: "4",
    date: "2024-01-14",
    agent: "James Miller",
    customer: "Maria Garcia",
    duration: "4:30",
    sentiment: "Positive",
  },
];

export default function TranscriptsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Transcripts"
        description="View and manage call transcripts"
      />
      <DataTable columns={columns} data={transcripts} />
    </div>
  );
}