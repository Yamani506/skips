"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Pause,
  Download,
  Flag,
  MoreVertical,
  Clock,
  User,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TimelineItem {
  id: string;
  timestamp: string;
  duration: string;
  agent: string;
  customer: string;
  type: "inbound" | "outbound";
  status: "completed" | "flagged" | "in-progress";
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    timestamp: "2024-03-20 14:30",
    duration: "5:23",
    agent: "Sarah Wilson",
    customer: "John Doe",
    type: "inbound",
    status: "completed",
  },
  {
    id: "2",
    timestamp: "2024-03-20 13:15",
    duration: "3:45",
    agent: "Michael Chen",
    customer: "Jane Smith",
    type: "outbound",
    status: "flagged",
  },
  {
    id: "3",
    timestamp: "2024-03-20 11:45",
    duration: "8:12",
    agent: "Emma Davis",
    customer: "Robert Johnson",
    type: "inbound",
    status: "completed",
  },
  {
    id: "4",
    timestamp: "2024-03-20 10:30",
    duration: "4:30",
    agent: "James Miller",
    customer: "Maria Garcia",
    type: "outbound",
    status: "in-progress",
  },
];

const getVoiceLogs=()=>{
  const respone=fetch('https://api.vapi.ai/call',{
    headers:{
      'Authorization': 'Bearer 25838acc-1005-4b22-80fb-f7916e61ef7f',
    }
  }).then(res=>res.json()).then(data=>console.log(data));
  return respone;
}

getVoiceLogs();

export function TimelineView() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <ScrollArea className="h-[calc(100vh-13rem)] rounded-md border">
          <div className="p-4 space-y-8">
            {timelineData.map((item) => (
              <div
                key={item.id}
                className={`relative flex space-x-4 ${
                  selectedItem === item.id ? "bg-accent/50 -mx-4 px-4 py-2 rounded-lg" : ""
                }`}
                onClick={() => setSelectedItem(item.id)}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                <div
                  className={`absolute left-[-0.3125rem] top-6 h-2.5 w-2.5 rounded-full border-2 ${
                    item.status === "flagged"
                      ? "border-destructive bg-destructive"
                      : item.status === "in-progress"
                      ? "border-warning bg-warning"
                      : "border-primary bg-primary"
                  }`}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={item.type === "inbound" ? "default" : "secondary"}
                      >
                        {item.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.timestamp}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          Flag call
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid gap-1">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.agent}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.customer}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Call Player</h3>
          {selectedItem ? (
            <>
              <div className="space-y-2">
                <div className="h-32 bg-accent rounded-md flex items-center justify-center">
                  <div className="w-full px-4">
                    <div className="h-1 bg-primary/20 rounded-full">
                      <div className="h-1 bg-primary rounded-full w-1/3" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Call Details</h4>
                {selectedItem && (
                  <div className="space-y-1">
                    {Object.entries(
                      timelineData.find((item) => item.id === selectedItem) || {}
                    ).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 text-sm">
                        <span className="text-muted-foreground capitalize">
                          {key}:
                        </span>
                        <span className="col-span-2">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              Select a call to view details
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}