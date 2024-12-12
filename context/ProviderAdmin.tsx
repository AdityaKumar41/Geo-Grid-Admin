"use client";
import React, { createContext, useContext, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainSider from "@/components/Sidebar";
import AdminLoginPage from "@/components/login";
import { Toaster } from "react-hot-toast";
import { useAdmin } from "@/hooks/useUser";

const Context = createContext({});
export const useProvider = () => useContext(Context);

// Create QueryClient instance outside component
const queryClient = new QueryClient();

interface ProviderProps {
  children: React.ReactNode;
}

// Create a separate component for the content that uses React Query hooks
const ProviderContent = ({ children }: ProviderProps) => {
  const { data } = useAdmin();
  console.log(data);
  const [open, setOpen] = useState(false);

  return (
    <Context.Provider value={open}>
        {data ? <MainSider>{children}</MainSider> : <AdminLoginPage />}
      <Toaster />
    </Context.Provider>
  );
};

export const ProviderContext = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProviderContent>{children}</ProviderContent>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
