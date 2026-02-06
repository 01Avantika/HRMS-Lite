import { useState } from "react";

export default function AttendanceTable({ records,selectedDate,setSelectedDate }) {
  const [filterDate, setFilterDate] = useState("");

  const filtered = filterDate
    ? records.filter(r =>
      new Date(r.date).toISOString().slice(0, 10) === filterDate
    )
    : records;

  const presentCount = {};
  records.forEach(r => {
    if (r.status === "Present" && r.employee && r.employee.employeeId) {
      presentCount[r.employee.employeeId] =
      (presentCount[r.employee.employeeId] || 0) + 1;
    }
});


  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <input type="date" onChange={e => setFilterDate(e.target.value)} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date
              <br />
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
              style={{ marginTop: "4px" }}
  />
            </th>
            <th>Status</th>
            <th>Total Present Days</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, i) => (
            <tr key={i}>
              <td>{r.employee?.fullName || "Unknown"}</td>
              <td>{r.date}</td>
              <td className={r.status === "Present" ? "status-present" : "status-absent"}>
                {r.status}
              </td>
              <td>
                <span className="badge">
                  {presentCount[r.employee.employeeId] || 0}
                </span>
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan="4">No attendance records</td>
            </tr>
)}

        </tbody>
      </table>
    </>
  );
}