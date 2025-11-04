import { Route, Routes } from "react-router";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

export const RoutesMap = () => {
  return (
    <>
      <Routes>
        <Route index />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};
