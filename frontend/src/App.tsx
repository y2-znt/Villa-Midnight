import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/shared/ScrollToTop";
import { AuthContextProvider } from "./context/AuthContext";

import AuthCallback from "./context/AuthCallback";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Contact from "./pages/Contact";
import AllEnigmas from "./pages/enigmas/AllEnigmas";
import CreateEnigma from "./pages/enigmas/CreateEnigma";
import EditEnigma from "./pages/enigmas/EditEnigma";
import EnigmaDetails from "./pages/enigmas/EnigmaDetails";
import MyEnigmas from "./pages/enigmas/MyEnigmas";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<AppLayout children={<Home />} />} />
          <Route
            path="/enigmas"
            element={<AppLayout children={<AllEnigmas />} />}
          />
          <Route
            path="/enigma/:id"
            element={<AppLayout children={<EnigmaDetails />} />}
          />
          <Route
            path="/create-enigma"
            element={
              <ProtectedRoute>
                <AuthLayout children={<CreateEnigma />} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-enigma/:id"
            element={<AppLayout children={<EditEnigma />} />}
          />
          <Route
            path="/my-enigmas"
            element={
              <ProtectedRoute>
                <AppLayout children={<MyEnigmas />} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AppLayout children={<Profile />} />
              </ProtectedRoute>
            }
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
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<AuthLayout children={<NotFound />} />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
