import { Navigate, Outlet, useParams } from "react-router-dom";

export const PublicRouteGuard = () => {
  const { username } = useParams();

  // Prevent admin routes from being matched
  if (username === "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

