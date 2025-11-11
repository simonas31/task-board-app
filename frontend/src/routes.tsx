import { Route, Routes } from "react-router";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import AuthLayout from "./layouts/auth-layout";
import BaseLayout from "./layouts/base-layout";
import ListProjectsPage from "./pages/list-projects-page";

export const RoutesMap = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<BaseLayout />}>
          <Route index path="/dashboard" />
          <Route path="/projects" element={<ListProjectsPage />} />
        </Route>
      </Routes>
    </>
  );
};
