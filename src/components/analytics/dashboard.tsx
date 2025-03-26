"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CallVolumeChart } from "@/components/analytics/call-volume-chart";
import { SentimentChart } from "@/components/analytics/sentiment-chart";
import { PerformanceMetrics } from "@/components/analytics/performance-metrics";
import { AgentStats } from "@/components/analytics/agent-stats";
import { CallDurationChart } from "@/components/analytics/call-duration-chart";
import { TopicsChart } from "@/components/analytics/topics-chart";
import { QualityScoreChart } from "@/components/analytics/quality-score-chart";
import { ResponseTimeChart } from "@/components/analytics/response-time-chart";
import { HandlingTimeChart } from "@/components/analytics/handling-time-chart";
import { EscalationRateChart } from "@/components/analytics/escalation-rate-chart";

export function AnalyticsDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="quality">Quality</TabsTrigger>
        <TabsTrigger value="agents">Agents</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Call Volume Trends</h3>
            <CallVolumeChart />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Customer Sentiment</h3>
            <SentimentChart />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Average Call Duration</h3>
            <CallDurationChart />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Common Topics</h3>
            <TopicsChart />
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="performance" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">First Response Time</h3>
            <ResponseTimeChart />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Average Handling Time</h3>
            <HandlingTimeChart />
          </Card>
          <Card className="p-6 md:col-span-2">
            <h3 className="text-lg font-medium mb-4">KPI Performance</h3>
            <PerformanceMetrics />
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="quality" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Quality Scores</h3>
            <QualityScoreChart />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Escalation Rates</h3>
            <EscalationRateChart />
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="agents" className="space-y-4">
        <AgentStats />
      </TabsContent>
    </Tabs>
  );
}