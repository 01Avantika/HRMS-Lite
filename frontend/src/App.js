import { useState } from "react";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

import "./styles/main.css";
import "./styles/table.css";
import "./styles/modal.css";

function App() {
  const [page, setPage] = useState ("employees");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HRMS Lite</h1>

        <div className="nav-buttons">
          <button
            className={page === "employees" ? "active" : ""}
            onClick={() => setPage("employees")}
          >
            Employees
          </button>

          <button
            className={page === "attendance" ? "active" : ""}
            onClick={() => setPage("attendance")}
          >
            Attendance
          </button>
        </div>
      </header>

      <main className="app-content">
        {page === "employees" && <Employees />}
        {page === "attendance" && <Attendance />}
      </main>
    </div>
  );
}

export default App;
