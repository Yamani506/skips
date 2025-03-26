"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PhoneCall,
  UserCheck,
  Clock,
  TrendingUp,
} from "lucide-react";

const metrics = [
  {
    title: "Total Calls",
    value: "2,543",
    change: "+12.5%",
    icon: PhoneCall,
  },
  {
    title: "Active Agents",
    value: "45",
    change: "+3.2%",
    icon: UserCheck,
  },
  {
    title: "Avg. Call Duration",
    value: "5m 23s",
    change: "-1.5%",
    icon: Clock,
  },
  {
    title: "Resolution Rate",
    value: "92%",
    change: "+2.1%",
    icon: TrendingUp,
  },
];

export function MetricsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={metric.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                {metric.change}
              </span>
              {" from last month"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}