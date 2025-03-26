"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const users = [
  {
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "Senior Agent",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson",
  },
  {
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Team Lead",
    status: "In Call",
    avatar: "https://ui-avatars.com/api/?name=Michael+Chen",
  },
  {
    name: "Emma Davis",
    email: "emma.davis@example.com",
    role: "Agent",
    status: "Break",
    avatar: "https://ui-avatars.com/api/?name=Emma+Davis",
  },
  {
    name: "James Miller",
    email: "james.miller@example.com",
    role: "Agent",
    status: "Offline",
    avatar: "https://ui-avatars.com/api/?name=James+Miller",
  },
];

export function UserTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === "Active"
                      ? "success"
                      : user.status === "In Call"
                      ? "default"
                      : user.status === "Break"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Send message</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}