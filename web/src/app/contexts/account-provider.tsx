"use client";
import { createContext, useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { Tables } from "../../../database.types";

export const AccountContext = createContext<Tables<"accounts"> | null>(null);

const AccountProvider = (props: React.PropsWithChildren) => {
  const { data, error } = useQuery<Tables<"accounts">>({
    queryKey: ["account"],
    queryFn: async () => {
      const response = await fetch("/api/account");
      if (!response.ok) {
        throw new Error("Failed to fetch account data");
      }
      return response.json();
    },
  });

  if (error) {
    console.error("Error fetching account data:", error);
  }
  if (!data) {
    return null; // or a loading state
  }

  return <AccountContext.Provider value={data ?? null}>{props.children}</AccountContext.Provider>;
};

export default AccountProvider;

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === null) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
