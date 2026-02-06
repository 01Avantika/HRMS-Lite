import { useEffect, useState } from "react";
import api from "../api/axios";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

const filteredRecords = selectedDate
  ? records.filter(r => r.date?.slice(0, 10) === selectedDate)
  : records;

  // ✅ FETCH ALL ATTENDANCE ON PAGE LOAD
  useEffect(() => {
    const fetchAllAttendance = async () => {
      try {
        const res = await api.get("/attendance");
        console.log("ALL ATTENDANCE 👉", res.data);
        setRecords(res.data);
      } catch (err) {
        console.error("Failed to fetch attendance", err);
      }
    };

    fetchAllAttendance();
  }, []);

  // ✅ FETCH ATTENDANCE BY EMPLOYEE
  const fetchAttendanceByEmployee = async (empId) => {
    try {
      const res = await api.get(`/attendance/${empId}`);
      console.log("EMP ATTENDANCE 👉", res.data);
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
    }
  };

  return (
    <div className="card">
      <AttendanceForm
        refresh={fetchAttendanceByEmployee}
        setEmployeeId={setEmployeeId}
      />

      <AttendanceTable records={filteredRecords} 
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
    </div>
  );
}
