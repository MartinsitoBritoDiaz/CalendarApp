import { Route, Routes } from "react-router-dom";
import { AuthRoutes} from "../auth";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import RiseLoader  from "react-spinners/RiseLoader";
import { CalendarRoutes } from "../app";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);
  
  if (status === "checking") return <div style={{ height: '100vh'}} className="d-flex justify-content-center align-items-center">
    <RiseLoader 
        color={'#ffff'}
        loading={true}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  </div>;

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
