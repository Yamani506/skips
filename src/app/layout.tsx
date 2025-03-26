"use client"
import './globals.css';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import {QueryClientProvider,QueryClient } from '@tanstack/react-query';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Call Center Analytics Dashboard',
//   description: 'Modern call center analytics and user management dashboard',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <ToastContainer />

        </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}