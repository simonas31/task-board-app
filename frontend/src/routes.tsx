import { Route, Routes } from "react-router";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import AuthLayout from "./layouts/auth-layout";
import DashboardLayout from "./layouts/dashboard-layout";

export const RoutesMap = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route index path="/dashboard" />
        </Route>
      </Routes>
    </>
  );
};
