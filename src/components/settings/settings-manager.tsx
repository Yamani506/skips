"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
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
import {
  Bell,
  Globe,
  Shield,
  // Database,
  // Mail,
  // Keyboard,
  Headphones,
  Save,
} from "lucide-react";
import { useForm } from "react-hook-form";

interface SystemSettings {
  notifications: {
    email: boolean;
    desktop: boolean;
    slack: boolean;
  };
  recording: {
    quality: "low" | "medium" | "high";
    retention: number;
    autoDelete: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
    ipWhitelist: string[];
  };
  localization: {
    timezone: string;
    dateFormat: string;
    language: string;
  };
}

const initialSettings: SystemSettings = {
  notifications: {
    email: true,
    desktop: true,
    slack: false,
  },
  recording: {
    quality: "medium",
    retention: 30,
    autoDelete: true,
  },
  security: {
    twoFactor: false,
    sessionTimeout: 30,
    ipWhitelist: [],
  },
  localization: {
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    language: "en",
  },
};

const timezones = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time" },
  { value: "America/Chicago", label: "Central Time" },
  { value: "America/Denver", label: "Mountain Time" },
  { value: "America/Los_Angeles", label: "Pacific Time" },
  { value: "Asia/Dubai", label: "Gulf Standard Time" },
  { value: "Asia/Riyadh", label: "Arabia Standard Time" },
];

const dateFormats = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
];

const languages = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
];
const {register}=useForm();
export function SettingsManager() {
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [ipInput, setIpInput] = useState("");

  const handleNotificationChange = (key: keyof typeof settings.notifications, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
    toast.success(`${key} notifications ${value ? "enabled" : "disabled"}`);
  };

  const handleRecordingChange = (key: keyof typeof settings.recording, value: any) => {
    setSettings((prev) => ({
      ...prev,
      recording: { ...prev.recording, [key]: value },
    }));
    toast.success(`Recording ${key} updated`);
  };

  const handleSecurityChange = (key: keyof typeof settings.security, value: any) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, [key]: value },
    }));
    toast.success(`Security ${key} updated`);
  };

  const handleLocalizationChange = (key: keyof typeof settings.localization, value: string) => {
    setSettings((prev) => ({
      ...prev,
      localization: { ...prev.localization, [key]: value },
    }));
    toast.success(`${key} updated`);
  };

  const handleAddIp = () => {
    if (ipInput && !settings.security.ipWhitelist.includes(ipInput)) {
      handleSecurityChange("ipWhitelist", [...settings.security.ipWhitelist, ipInput]);
      setIpInput("");
    }
  };

  const handleRemoveIp = (ip: string) => {
    handleSecurityChange(
      "ipWhitelist",
      settings.security.ipWhitelist.filter((item) => item !== ip)
    );
  };

  const handleSaveAll = () => {
    toast.success("All settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">System Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure global system preferences
          </p>
        </div>
        <Button onClick={handleSaveAll}>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="recording">
            <Headphones className="mr-2 h-4 w-4" />
            Recording
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="localization">
            <Globe className="mr-2 h-4 w-4" />
            Localization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("email", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show browser notifications
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.desktop}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("desktop", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Slack Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to Slack
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.slack}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("slack", checked)
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="recording">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Recording Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Recording Quality</Label>
                <Select
                  value={settings.recording.quality}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    handleRecordingChange("quality", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (32kbps)</SelectItem>
                    <SelectItem value="medium">Medium (128kbps)</SelectItem>
                    <SelectItem value="high">High (256kbps)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Retention Period (days)</Label>
                <Input
                  type="number"
                  value={settings.recording.retention}
                  onChange={(e) =>
                    handleRecordingChange("retention", parseInt(e.target.value))
                  }
                  register={register}

                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Delete</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically delete recordings after retention period
                  </p>
                </div>
                <Switch
                  checked={settings.recording.autoDelete}
                  onCheckedChange={(checked) =>
                    handleRecordingChange("autoDelete", checked)
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Security Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all users
                  </p>
                </div>
                <Switch
                  checked={settings.security.twoFactor}
                  onCheckedChange={(checked) =>
                    handleSecurityChange("twoFactor", checked)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) =>
                    handleSecurityChange("sessionTimeout", parseInt(e.target.value))
                  }
                  register={register}
                />
              </div>
              <div className="space-y-2">
                <Label>IP Whitelist</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter IP address"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    register={register}
                  />
                  <Button onClick={handleAddIp}>Add</Button>
                </div>
                <div className="space-y-2">
                  {settings.security.ipWhitelist.map((ip) => (
                    <div
                      key={ip}
                      className="flex items-center justify-between bg-muted p-2 rounded-md"
                    >
                      <span>{ip}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveIp(ip)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="localization">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Localization Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select
                  value={settings.localization.timezone}
                  onValueChange={(value) =>
                    handleLocalizationChange("timezone", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select
                  value={settings.localization.dateFormat}
                  onValueChange={(value) =>
                    handleLocalizationChange("dateFormat", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={settings.localization.language}
                  onValueChange={(value) =>
                    handleLocalizationChange("language", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}