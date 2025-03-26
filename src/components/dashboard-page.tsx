"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MetricsGrid } from "@/components/metrics-grid";
import { UserTable } from "@/components/user-table";
import { usePathname } from "next/navigation";

export function DashboardPage() {
  const pathname = usePathname();
  const isMainDashboard = pathname === "/";

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 space-y-6 overflow-y-auto p-6">
          <div>
            <h1 className="text-3xl font-bold">
              {isMainDashboard
                ? "Dashboard"
                : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)}
            </h1>
            <p className="text-muted-foreground">
              {isMainDashboard
                ? "Call center analytics and user management overview"
                : `View and manage ${pathname.slice(1)}`}
            </p>
          </div>
          {isMainDashboard && (
            <>
              <MetricsGrid />
              <UserTable />
            </>
          )}
          {!isMainDashboard && (
            <div className="rounded-lg border bg-card p-8 text-card-foreground">
              <p className="text-lg text-muted-foreground">
                This section is under development. Check back soon for updates!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}