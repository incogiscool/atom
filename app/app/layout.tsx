import ProtectedRoute from "@/components/containers/ProtectedRoute";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
