import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import AllEnigmas from "./pages/AllEnigmas";
import Contact from "./pages/Contact";
import CreateEnigma from "./pages/CreateEnigma";
import EditEnigma from "./pages/EditEnigma";
import EnigmaDetails from "./pages/EnigmaDetails";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyEnigmas from "./pages/MyEnigmas";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<AppLayout children={<Home />} />} />
          <Route
            path="/all-enigmas"
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
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
