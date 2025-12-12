import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUser } from "@/client/services/user";

export const AdminAuthGuard = () => {
  const location = useLocation();
  const redirectTo = location.pathname + location.search;

  const { user, loading } = useUser();

  if (loading) return null;

  if (user && user.isAdmin) {
    return <Outlet />;
  }

  return <Navigate to={`/admin/auth/login?redirect=${redirectTo}`} replace />;
};

