import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { CalendarRoutes } from "../app";
import { getEnvVariables } from "../helpers";
import { useAuthStore } from "../hooks";
import { useEffect, useMemo } from "react";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  // if (status === "checking") return (<h3>Loading...</h3>);

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>
      <Route
        path="auth/*"
        element={
          <PublicRoute>
            <AuthRoutes />
          </PublicRoute>
        }
      />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <CalendarRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
