import { api } from "@/lib/axios";
import { createContext } from "react";
import useSWR, { type KeyedMutator } from "swr";

type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type AuthProviderState = {
  user: User | null | undefined;
  setUser: KeyedMutator<User | null>;
};

const initialState: AuthProviderState = {
  user: null,
  setUser: async () => null,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const unprotectedRoutes = ["/login", "/register"];

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const { data, isLoading, mutate } = useSWR<User | null>("/me", fetcher, {
    shouldRetryOnError: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  // additional: add loading screen
  if (isLoading) {
    return <>Is Loading!</>;
  }

  const value: AuthProviderState = {
    user: data,
    setUser: mutate,
  };

  return (
    <AuthProviderContext.Provider {...props} value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export { AuthProviderContext };
