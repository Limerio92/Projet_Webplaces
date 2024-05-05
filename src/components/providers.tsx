"use client";
import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "@/utils/query-client";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
