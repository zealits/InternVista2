import { Navigate, Outlet, useParams } from "react-router-dom";

import { getSubdomain } from "@/client/libs/subdomain";

export const PublicRouteGuard = () => {
  const { username } = useParams();
  const subdomain = getSubdomain();

  // If on subdomain, username comes from subdomain, not params
  // If not on subdomain, username comes from params (legacy path-based routing)
  const effectiveUsername = subdomain || username;

  // Prevent admin routes from being matched
  if (effectiveUsername === "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

