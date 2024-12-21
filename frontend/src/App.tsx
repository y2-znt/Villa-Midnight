import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";
import { AuthContextProvider } from "./contexts/AuthContext";
import AllEnigmas from "./pages/AllEnigmas";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<AppLayout children={<Home />} />} />
          <Route
            path="/all-enigmas"
            element={<AppLayout children={<AllEnigmas />} />}
          />
          <Route
            path="/contact"
            element={<AppLayout children={<Contact />} />}
          />
          <Route path="/faq" element={<AppLayout children={<FAQ />} />} />
          <Route
            path="/register"
            element={<AuthLayout children={<Register />} />}
          />
          <Route path="/login" element={<AuthLayout children={<Login />} />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
