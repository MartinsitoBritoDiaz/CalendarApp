import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";

export const CalendarApp = () => {
  return (
    <div className="main-container">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};
