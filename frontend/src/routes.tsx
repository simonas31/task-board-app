import { Route, Routes } from "react-router";
import LoginPage from "./pages/login-page";

export const RoutesMap = () => {
  return (
    <>
      <Routes>
        <Route index />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};
