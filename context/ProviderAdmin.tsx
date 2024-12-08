"use client";
// main context provider
import React, { createContext, useContext, useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import MainSider from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

const Context = createContext({});
export const useProvider = () => useContext(Context);

interface ProviderProps {
  children: React.ReactNode;
}

export const ProviderContext = ({ children }: ProviderProps) => {
  const queryClient = new QueryClient();
  const [open, setOpen] = useState(false);
  return (
    <Context.Provider value={open}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <MainSider>{children}</MainSider>
      </QueryClientProvider>
    </Context.Provider>
  );
};
