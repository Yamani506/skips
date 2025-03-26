"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const agentData = [
  {
    name: "Sarah Wilson",
    calls: 145,
    avgHandleTime: "4:30",
    satisfaction: 95,
    status: "Exceeding",
  },
  {
    name: "Michael Chen",
    calls: 132,
    avgHandleTime: "5:15",
    satisfaction: 88,
    status: "Meeting",
  },
  {
    name: "Emma Davis",
    calls: 128,
    avgHandleTime: "4:45",
    satisfaction: 92,
    status: "Exceeding",
  },
  {
    name: "James Miller",
    calls: 118,
    avgHandleTime: "6:00",
    satisfaction: 82,
    status: "Below",
  },
];

export function AgentStats() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead className="text-right">Total Calls</TableHead>
            <TableHead className="text-right">Avg Handle Time</TableHead>
            <TableHead className="text-right">Satisfaction %</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agentData.map((agent) => (
            <TableRow key={agent.name}>
              <TableCell className="font-medium">{agent.name}</TableCell>
              <TableCell className="text-right">{agent.calls}</TableCell>
              <TableCell className="text-right">{agent.avgHandleTime}</TableCell>
              <TableCell className="text-right">{agent.satisfaction}%</TableCell>
              <TableCell>
                <Badge
                  variant={
                    agent.status === "Exceeding"
                      ? "success"
                      : agent.status === "Meeting"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {agent.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}