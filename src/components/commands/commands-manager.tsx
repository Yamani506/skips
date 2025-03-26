"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  Plus,
  Edit2,
  Trash2,
  Mic,
  // Play,
  Zap,
  Tag,
} from "lucide-react";
import { useForm } from "react-hook-form";

interface VoiceCommand {
  id: string;
  name: string;
  trigger: string;
  action: string;
  category: "system" | "routing" | "automation";
  status: "active" | "disabled";
  description: string;
}

const initialCommands: VoiceCommand[] = [
  {
    id: "1",
    name: "Transfer to Supervisor",
    trigger: "escalate call",
    action: "transfer_to_supervisor",
    category: "routing",
    status: "active",
    description: "Transfers the current call to an available supervisor",
  },
  {
    id: "2",
    name: "Start Recording",
    trigger: "start recording",
    action: "begin_recording",
    category: "system",
    status: "active",
    description: "Initiates call recording with compliance notification",
  },
  {
    id: "3",
    name: "Create Ticket",
    trigger: "create support ticket",
    action: "create_ticket",
    category: "automation",
    status: "active",
    description: "Creates a new support ticket with call details",
  },
];

export function CommandsManager() {
  const [commands, setCommands] = useState<VoiceCommand[]>(initialCommands);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState<VoiceCommand | null>(null);
  const [newCommand, setNewCommand] = useState<Partial<VoiceCommand>>({
    category: "system",
    status: "active",
  });

  const handleStatusChange = (commandId: string, newStatus: boolean) => {
    setCommands((currentCommands) =>
      currentCommands.map((command) =>
        command.id === commandId
          ? {
              ...command,
              status: newStatus ? "active" : "disabled",
            }
          : command
      )
    );
    toast.success(
      `Command ${newStatus ? "activated" : "deactivated"} successfully`
    );
  };

  const handleAddCommand = () => {
    if (!newCommand.name || !newCommand.trigger || !newCommand.action) {
      toast.error("Please fill in all required fields");
      return;
    }

    const command: VoiceCommand = {
      id: (commands.length + 1).toString(),
      name: newCommand.name,
      trigger: newCommand.trigger,
      action: newCommand.action,
      category: newCommand.category as "system" | "routing" | "automation",
      status: "active",
      description: newCommand.description || "",
    };

    setCommands([...commands, command]);
    setIsAddDialogOpen(false);
    setNewCommand({
      category: "system",
      status: "active",
    });
    toast.success("Command added successfully");
  };

  const handleEdit = (command: VoiceCommand) => {
    setSelectedCommand(command);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (command: VoiceCommand) => {
    setSelectedCommand(command);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedCommand) {
      setCommands((currentCommands) =>
        currentCommands.map((c) =>
          c.id === selectedCommand.id ? selectedCommand : c
        )
      );
      toast.success("Command updated successfully");
      setIsEditDialogOpen(false);
      setSelectedCommand(null);
    }
  };

  const confirmDelete = () => {
    if (selectedCommand) {
      setCommands((currentCommands) =>
        currentCommands.filter((c) => c.id !== selectedCommand.id)
      );
      toast.success("Command deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedCommand(null);
    }
  };
  const {register}=useForm()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Voice Commands</h2>
          <p className="text-sm text-muted-foreground">
            {commands.length} commands configured
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Command
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Command</DialogTitle>
              <DialogDescription>
                Create a new voice command with trigger and action
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Command Name</Label>
                <Input
                  id="name"
                  value={newCommand.name || ""}
                  onChange={(e) =>
                    setNewCommand({ ...newCommand, name: e.target.value })
                  }
                  placeholder="Enter command name"
                  register={register}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="trigger">Voice Trigger</Label>
                <Input
                  id="trigger"
                  value={newCommand.trigger || ""}
                  onChange={(e) =>
                    setNewCommand({ ...newCommand, trigger: e.target.value })
                  }
                  placeholder="Enter voice trigger phrase"
                  register={register}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="action">Action</Label>
                <Input
                  id="action"
                  value={newCommand.action || ""}
                  onChange={(e) =>
                    setNewCommand({ ...newCommand, action: e.target.value })
                  }
                  placeholder="Enter action identifier"
                  register={register}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newCommand.category}
                  onValueChange={(value) =>
                    setNewCommand({
                      ...newCommand,
                      category: value as "system" | "routing" | "automation",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="routing">Routing</SelectItem>
                    <SelectItem value="automation">Automation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                {/* <Textarea
                  id="description"
                  value={newCommand.description || ""}
                  onChange={(e) =>
                    setNewCommand({ ...newCommand, description: e.target.value })
                  }
                  placeholder="Enter command description"
                /> */}

              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCommand}>Add Command</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Command</TableHead>
              <TableHead>Trigger</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commands.map((command) => (
              <TableRow key={command.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Command className="h-4 w-4 text-muted-foreground" />
                    <span>{command.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4 text-muted-foreground" />
                    <span>{command.trigger}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      command.category === "system"
                        ? "default"
                        : command.category === "routing"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {command.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={command.status === "active"}
                    onCheckedChange={(checked) =>
                      handleStatusChange(command.id, checked)
                    }
                    aria-label="Toggle command status"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(command)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(command)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Command Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {commands.map((command) => (
          <Card key={command.id} className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">{command.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {command.category.charAt(0).toUpperCase() +
                    command.category.slice(1)}
                </p>
              </div>
              <Switch
                checked={command.status === "active"}
                onCheckedChange={(checked) =>
                  handleStatusChange(command.id, checked)
                }
                aria-label="Toggle command status"
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <Mic className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Trigger: "{command.trigger}"</span>
              </div>
              <div className="flex items-center text-sm">
                <Zap className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Action: {command.action}</span>
              </div>
              {command.description && (
                <div className="flex items-start text-sm">
                  <Tag className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{command.description}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Command</DialogTitle>
            <DialogDescription>
              Modify the command settings below
            </DialogDescription>
          </DialogHeader>
          {selectedCommand && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Command Name</Label>
                <Input
                  id="edit-name"
                  value={selectedCommand.name}
                  onChange={(e) =>
                    setSelectedCommand({
                      ...selectedCommand,
                      name: e.target.value,
                    })
                  }
                  register={register}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-trigger">Voice Trigger</Label>
                <Input
                  id="edit-trigger"
                  value={selectedCommand.trigger}
                  onChange={(e) =>
                    setSelectedCommand({
                      ...selectedCommand,
                      trigger: e.target.value,
                    })
                  }
                  register={register}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-action">Action</Label>
                <Input
                  id="edit-action"
                  value={selectedCommand.action}
                  onChange={(e) =>
                    setSelectedCommand({
                      ...selectedCommand,
                      action: e.target.value,
                    })
                    
                  }
                  register={register}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={selectedCommand.category}
                  onValueChange={(value: "system" | "routing" | "automation") =>
                    setSelectedCommand({
                      ...selectedCommand,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="routing">Routing</SelectItem>
                    <SelectItem value="automation">Automation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                {/* <Textarea
                  id="edit-description"
                  value={selectedCommand.description}
                  onChange={(e) =>
                    setSelectedCommand({
                      ...selectedCommand,
                      description: e.target.value,
                    })
                  }
              
                /> */}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Command</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this command? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}