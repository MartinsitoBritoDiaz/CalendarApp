import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { CalendarRoutes } from "../app";

export const AppRouter = () => {
  const authStatus = "authenticated";

  return (
    <Routes>
        {
            (authStatus === 'not-authenticated')
            ? <Route path="/auth/*" element={<AuthRoutes /> } /> 
            : <Route path="/*" element={<CalendarRoutes /> } />
        }
        <Route path="/*" element={ <Navigate to='/auth/login' /> } />
    </Routes>
  );
};
