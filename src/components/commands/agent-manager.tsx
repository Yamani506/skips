"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { Upload, FileText, Settings, Volume2, Brain } from "lucide-react";
import { useForm } from "react-hook-form";

interface AgentConfig {
  temperature: number;
  maxTokens: number;
  contextWindow: number;
  language: string;
  voiceSettings: {
    pitch: number;
    speed: number;
    accent: string;
  };
}

const initialConfig: AgentConfig = {
  temperature: 0.7,
  maxTokens: 2048,
  contextWindow: 4096,
  language: "en",
  voiceSettings: {
    pitch: 1,
    speed: 1,
    accent: "neutral",
  },
};

const languageOptions = [
  { value: "en", label: "English" },
  { value: "ar-sa", label: "Arabic (Saudi)" },
  { value: "ar", label: "Arabic (General)" },
  { value: "ur", label: "Urdu" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
];

const accentOptions = [
  { value: "neutral", label: "Neutral" },
  { value: "british", label: "British" },
  { value: "american", label: "American" },
  { value: "australian", label: "Australian" },
  { value: "saudi", label: "Saudi Arabic" },
  { value: "egyptian", label: "Egyptian Arabic" },
  { value: "levantine", label: "Levantine Arabic" },
  { value: "urdu", label: "Urdu" },
];

export function AgentManager() {
  const [config, setConfig] = useState<AgentConfig>(initialConfig);
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [promptTemplate, setPromptTemplate] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
const {register} = useForm();
  const handleConfigChange = (key: keyof AgentConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    toast.success(`${key} updated successfully`);

    if (key === "language") {
      let newAccent = "neutral";
      if (value.startsWith("ar")) {
        newAccent = "saudi";
      } else if (value === "ur") {
        newAccent = "urdu";
      }
      handleVoiceSettingChange("accent", newAccent);
    }
  };

  const handleVoiceSettingChange = (key: keyof typeof config.voiceSettings, value: any) => {
    setConfig((prev) => ({
      ...prev,
      voiceSettings: { ...prev.voiceSettings, [key]: value },
    }));
    toast.success(`Voice ${key} updated`);
  };

  return (
    <Tabs defaultValue="knowledge" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="knowledge">
          <FileText className="mr-2 h-4 w-4" />
          Knowledge Base
        </TabsTrigger>
        <TabsTrigger value="config">
          <Settings className="mr-2 h-4 w-4" />
          Configuration
        </TabsTrigger>
        <TabsTrigger value="voice">
          <Volume2 className="mr-2 h-4 w-4" />
          Voice Settings
        </TabsTrigger>
        <TabsTrigger value="training">
          <Brain className="mr-2 h-4 w-4" />
          Training
        </TabsTrigger>
      </TabsList>

      <TabsContent value="knowledge" className="space-y-4">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Knowledge Base</h3>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Direct Input</Label>
              {/* <Textarea
                placeholder="Enter knowledge base content..."
                value={knowledgeBase}
                onChange={(e) => setKnowledgeBase(e.target.value)}
                className="min-h-[200px]"
              /> */}
              
            </div>
            <div className="grid gap-2">
              <Label>Upload Files</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop files here or click to browse
                </p>
                <Button variant="outline" className="mt-2">
                  Upload Files
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="config" className="space-y-4">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Agent Configuration</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Temperature ({config.temperature})</Label>
              <Slider
                value={[config.temperature]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={([value]) =>
                  handleConfigChange("temperature", value)
                }
              />
              <p className="text-sm text-muted-foreground">
                Controls response randomness
              </p>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={config.language}
                onValueChange={(value) => handleConfigChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Tokens</Label>
              {/* <Input
                type="number"
                value={config.maxTokens}
                // onChange={(e) =>
                //   handleConfigChange("maxTokens", parseInt(e.target.value))
                // }
                
              /> */}
            </div>
            <div className="space-y-2">
              <Label>Context Window</Label>
              {/* <Input
                type="number"
                value={config.contextWindow}
                onChange={(e) =>
                  handleConfigChange("contextWindow", parseInt(e.target.value))
                }
              /> */}
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="voice" className="space-y-4">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Voice Settings</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Pitch ({config.voiceSettings.pitch})</Label>
              <Slider
                value={[config.voiceSettings.pitch]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={([value]) =>
                  handleVoiceSettingChange("pitch", value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Speed ({config.voiceSettings.speed})</Label>
              <Slider
                value={[config.voiceSettings.speed]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={([value]) =>
                  handleVoiceSettingChange("speed", value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Accent</Label>
              <Select
                value={config.voiceSettings.accent}
                onValueChange={(value) => handleVoiceSettingChange("accent", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select accent" />
                </SelectTrigger>
                <SelectContent>
                  {accentOptions
                    .filter((option) => {
                      if (config.language.startsWith("ar")) {
                        return option.value === "neutral" || option.value.includes("arabic");
                      }
                      if (config.language === "ur") {
                        return option.value === "neutral" || option.value === "urdu";
                      }
                      return !option.value.includes("arabic") && option.value !== "urdu";
                    })
                    .map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="training" className="space-y-4">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Training & Prompts</h3>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Custom Prompt Template</Label>
              {/* <Textarea
                placeholder="Enter custom prompt template..."
                value={promptTemplate}
                onChange={(e) => setPromptTemplate(e.target.value)}
                className="min-h-[200px]"
              /> */}
              <p className="text-sm text-muted-foreground">
                Use {"{input}"} as placeholder for user input
              </p>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}