"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  Volume2,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface Policy {
  id: string;
  name: string;
  type: "recognition" | "routing" | "compliance";
  status: "active" | "disabled";
  priority: number;
  conditions: string[];
  actions: string[];
}

const initialPolicies: Policy[] = [
  {
    id: "1",
    name: "Language Detection",
    type: "recognition",
    status: "active",
    priority: 1,
    conditions: ["Non-English speech detected"],
    actions: ["Route to language specialist", "Enable translation service"],
  },
  {
    id: "2",
    name: "High Priority Customer",
    type: "routing",
    status: "active",
    priority: 2,
    conditions: ["Premium account holder", "Previous escalation"],
    actions: ["Route to senior agent", "Enable priority queue"],
  },
  {
    id: "3",
    name: "Compliance Recording",
    type: "compliance",
    status: "active",
    priority: 3,
    conditions: ["Financial transaction", "Personal data discussion"],
    actions: ["Start recording", "Enable compliance monitoring"],
  },
];

export function PoliciesManager() {
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const handleStatusChange = (policyId: string, newStatus: boolean) => {
    setPolicies((currentPolicies) =>
      currentPolicies.map((policy) =>
        policy.id === policyId
          ? {
              ...policy,
              status: newStatus ? "active" : "disabled",
            }
          : policy
      )
    );
    toast.success(
      `Policy ${newStatus ? "activated" : "deactivated"} successfully`
    );
  };

  const handleEdit = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPolicy) {
      setPolicies((currentPolicies) =>
        currentPolicies.filter((p) => p.id !== selectedPolicy.id)
      );
      toast.success("Policy deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedPolicy(null);
    }
  };

  const handleSaveEdit = () => {
    if (selectedPolicy) {
      setPolicies((currentPolicies) =>
        currentPolicies.map((p) =>
          p.id === selectedPolicy.id ? selectedPolicy : p
        )
      );
      toast.success("Policy updated successfully");
      setIsEditDialogOpen(false);
      setSelectedPolicy(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Voice Policies</h2>
          <p className="text-sm text-muted-foreground">
            {policies.length} policies configured
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Policy</DialogTitle>
              <DialogDescription>
                Configure a new voice policy with conditions and actions
              </DialogDescription>
            </DialogHeader>
            {/* Add Policy Form Content */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Policy Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {policy.type === "recognition" ? (
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                      ) : policy.type === "routing" ? (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Shield className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{policy.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        policy.priority === 1
                          ? "destructive"
                          : policy.priority === 2
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {policy.priority === 1
                        ? "High"
                        : policy.priority === 2
                        ? "Medium"
                        : "Low"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={policy.status === "active"}
                      onCheckedChange={(checked) =>
                        handleStatusChange(policy.id, checked)
                      }
                      aria-label="Toggle policy status"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(policy)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(policy)}
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

        {/* Edit Policy Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Policy</DialogTitle>
              <DialogDescription>
                Modify the policy settings below
              </DialogDescription>
            </DialogHeader>
            {selectedPolicy && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Policy Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedPolicy.name}
                    onChange={(e) =>
                      setSelectedPolicy({
                        ...selectedPolicy,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Policy Type</Label>
                  <Select
                    value={selectedPolicy.type}
                    onValueChange={(value: "recognition" | "routing" | "compliance") =>
                      setSelectedPolicy({
                        ...selectedPolicy,
                        type: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recognition">Voice Recognition</SelectItem>
                      <SelectItem value="routing">Call Routing</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-priority">Priority Level</Label>
                  <Select
                    value={selectedPolicy.priority.toString()}
                    onValueChange={(value) =>
                      setSelectedPolicy({
                        ...selectedPolicy,
                        priority: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">High</SelectItem>
                      <SelectItem value="2">Medium</SelectItem>
                      <SelectItem value="3">Low</SelectItem>
                    </SelectContent>
                  </Select>
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

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Policy</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this policy? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Policy Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {policies.map((policy) => (
            <Card key={policy.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{policy.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Policy
                  </p>
                </div>
                <Switch
                  checked={policy.status === "active"}
                  onCheckedChange={(checked) =>
                    handleStatusChange(policy.id, checked)
                  }
                  aria-label="Toggle policy status"
                />
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Conditions</h4>
                  <div className="space-y-1">
                    {policy.conditions.map((condition, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        {condition}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Actions</h4>
                  <div className="space-y-1">
                    {policy.actions.map((action, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}