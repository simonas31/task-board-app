import { Outlet } from "react-router";

export default function AuthLayout() {
  // check if user is authenticated.
  // if so redirect to dashboard, else proceed
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
}
