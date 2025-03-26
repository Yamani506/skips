import { PageHeader } from "@/components/page-header";
import { CommandsManager } from "@/components/commands/commands-manager";
import { AgentManager } from "@/components/commands/agent-manager";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function CommandsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Voice Commands & Agent Management"
        description="Configure voice commands, triggers, and AI agent settings"
      />
      <Tabs defaultValue="commands" className="space-y-6">
        <TabsList>
          <TabsTrigger value="commands">Voice Commands</TabsTrigger>
          <TabsTrigger value="agent">Agent Management</TabsTrigger>
        </TabsList>
        <TabsContent value="commands">
          <CommandsManager />
        </TabsContent>
        <TabsContent value="agent">
          <AgentManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}