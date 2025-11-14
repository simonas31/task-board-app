import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import AuthLayout from "./layouts/auth-layout";
import BaseLayout from "./layouts/base-layout";
import ListProjectsPage from "./pages/projects/list-projects-page";
import CreateProjectPage from "./pages/projects/create-project-page";
import EditProjectPage from "./pages/projects/edit-project-page";
import ViewProjectPage from "./pages/projects/view-project-page";

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
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route path="/projects/:projectId" element={<ViewProjectPage />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectPage />}
          />
        </Route>
      </Routes>
    </>
  );
};
