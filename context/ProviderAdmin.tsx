"use client";
// main context provider
import React, { createContext, useContext, useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import MainSider from "@/components/Sidebar";
import AdminLoginPage from "@/components/login";

const Context = createContext({});
export const useProvider = () => useContext(Context);

interface ProviderProps {
  children: React.ReactNode;
}

export const ProviderContext = ({ children }: ProviderProps) => {
  const user = true;
  const queryClient = new QueryClient();
  const [open, setOpen] = useState(false);
  return (
    <Context.Provider value={open}>
      <QueryClientProvider client={queryClient}>
        {user ? <MainSider>{children}</MainSider> : <AdminLoginPage />}
      </QueryClientProvider>
    </Context.Provider>
  );
};
