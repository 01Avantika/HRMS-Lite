import { useEffect, useState } from "react";
import api from "../api/axios";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="card">
      <div className="header">
        <h3>Employee Management</h3>
        <button onClick={() => setShowForm(true)}>+ Add Employee</button>
      </div>

      <EmployeeTable employees={employees} refresh={fetchEmployees} />

      {showForm && (
        <EmployeeForm
          close={() => setShowForm(false)}
          refresh={fetchEmployees}
        />
      )}
    </div>
  );
}

