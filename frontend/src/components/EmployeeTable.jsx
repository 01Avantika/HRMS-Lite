import api from "../api/axios";

export default function EmployeeTable({ employees, refresh }) {
  const remove = async (id) => {
    await api.delete(`/employees/${id}`);
    refresh();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp._id}>
            <td>{emp.employeeId}</td>
            <td>{emp.fullName}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              <button className="danger" onClick={() => remove(emp._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

