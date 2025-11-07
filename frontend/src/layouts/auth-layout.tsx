import { AuthProvider } from "@/components/auth-provider";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex justify-center items-center">
        <Outlet />
      </div>
    </AuthProvider>
  );
}
