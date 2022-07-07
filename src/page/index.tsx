import { Route, Routes } from "react-router-dom";
import AddPage from "./add";
import LoginPage from "./login";

export const Routing = () => (
    <Routes>
      <Route path="/" element={<AddPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )