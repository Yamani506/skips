"use client";

import { Bell, Search,LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {User2} from "lucide-react"

export function Header() {
  return (
    <header className="flex h-16 items-center border-b px-6">
      <div className="flex flex-1 items-center space-x-4">
        <div className="relative w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-x-1 items-center ">
          <User2  className="h-4 w-4" />
          <p>Yamani </p>
          
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
       
        <ThemeToggle />
       <Button  variant="ghost" size="icon">
         <LogOut/>
       </Button>
      </div>
    </header>
  );
}