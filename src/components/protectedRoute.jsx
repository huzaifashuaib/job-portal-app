import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, replace, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to={"/?sign-in=true"} />;
  }
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to={"/onboarding"} />;
  }

  if (
    user !== undefined &&
    user?.unsafeMetadata?.role === "candidate" &&
    pathname === "/post-jobs"
  ) {
    return <Navigate to="/jobs-listing" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
