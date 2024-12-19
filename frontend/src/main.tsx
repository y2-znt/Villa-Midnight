import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./AppLayout.tsx";
import AuthLayout from "./AuthLayout.tsx";
import "./index.css";
import AllEnigmas from "./pages/AllEnigmas.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout children={<Home />} />} />
        <Route
          path="/all-enigmas"
          element={<AppLayout children={<AllEnigmas />} />}
        />
        <Route path="/contact" element={<AppLayout children={<Contact />} />} />
        <Route path="/faq" element={<AppLayout children={<FAQ />} />} />
        <Route
          path="/register"
          element={<AuthLayout children={<Register />} />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
