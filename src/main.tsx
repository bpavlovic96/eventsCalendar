import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import weekdayPlugin from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayjs from "dayjs";
import en from "dayjs/locale/en";

dayjs.extend(weekOfYear);
dayjs.extend(weekdayPlugin);
dayjs.locale({
  ...en,
  weekStart: 1,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
