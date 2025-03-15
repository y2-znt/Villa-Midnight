import DashboardContainer from "@/components/shared/dashboard/DashboardContainer";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import "./admin.css";
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute>
      <DashboardContainer>{children}</DashboardContainer>
    </ProtectedRoute>
  );
}
