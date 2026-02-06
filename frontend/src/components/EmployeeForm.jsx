import { useState } from "react";
import api from "../api/axios";

export default function EmployeeForm({ close, refresh }) {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const submit = async () => {
  const payload = {
    employeeId: form.employeeId.trim(),
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    department: form.department.trim(),
  };

  if (!payload.employeeId || !payload.fullName || !payload.email || !payload.department) {
    alert("All fields are required");
    return;
  }

  try {
    await api.post("/employees", payload);
    refresh();
    close();
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Employee</h3>
        <input placeholder="Employee ID" value={form.employeeId} onChange={e => setForm({ ...form, employeeId: e.target.value })} />
        <input placeholder="Full Name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
        <button onClick={submit}>Save</button>
        <button className="secondary" onClick={close}>Cancel</button>
      </div>
    </div>
  );
}
