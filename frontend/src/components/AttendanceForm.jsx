import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AttendanceForm({ refresh }) {
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to load employees", err);
    }
  };

  fetchEmployees();
}, []);


  const submit = async () => {
  if (!form.employeeId || !form.date) {
    alert("Employee ID and Date are required");
    return;
  }

  try {
    await api.post("/attendance", {
      employeeId: form.employeeId.trim(),
      date: new Date(form.date).toISOString(),
      status: form.status,
    });

    refresh();
    setForm({ employeeId: "", date: "", status: "Present" });

  } catch (err) {
    if (err.response?.status === 409) {
      alert("Attendance already marked for this employee on this date");
    } else {
      alert("Failed to mark attendance");
      console.error(err);
    }
  }
};


  return (
    <div className="header">
      <h3>Attendance Management</h3>

      <div className="form-row">
        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <select
        value={form.employeeId} 
        onChange={(e) => 
            setForm({ ...form, employeeId: e.target.value })
            }
        >
        <option value="">Select Employee</option>
        {employees.map(emp => (
            <option key={emp._id} value={emp.employeeId}>
                {emp.fullName} ({emp.employeeId})
        </option>))}
        </select>


        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button onClick={submit}>+ Mark Attendance</button>
      </div>
    </div>
  );
}
