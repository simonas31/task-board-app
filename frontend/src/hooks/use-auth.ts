import { AuthProviderContext } from "@/providers/auth-provider";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};
