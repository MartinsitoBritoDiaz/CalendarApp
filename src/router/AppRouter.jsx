import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes, LoginPage } from "../auth";
import { CalendarPage, CalendarRoutes } from "../app";
import { getEnvVariables } from "../helpers";
import { useAuthStore } from "../hooks";
import { useEffect, useMemo } from "react";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);
  
  if (status === "checking") return <h3>Loading...</h3>;

  return (
    // <Routes>
    //   {status === "not-authenticated" ? (
    //     <>
    //       <Route path="/auth/*" element={<LoginPage />} />
    //       <Route path="/*" element={<Navigate to="/auth/login" />} />
    //     </>
    //   ) : (
    //     <>
    //       <Route path="/" element={<CalendarPage />} />
    //       <Route path="/*" element={<Navigate to="/" />} />
    //     </>
    //   )}
    // </Routes>
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
