import { useEffect, useState } from "react";
import api from "../axios";

export default function AvgSalary() {
  const [avgSalaries, setAvgSalaries] = useState([]);

  const fetchAvgSalaries = async () => {
    try {
      const res = await api.get("avg_salary"); // GET /employees/avg-salary
      setAvgSalaries(res.data);
    } catch (err) {
      console.error("Error fetching average salaries", err);
    }
  };

  useEffect(() => {
    fetchAvgSalaries();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Average Salary by Department</h2>

      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Department</th>
            <th className="border px-2 py-1">Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {avgSalaries.length > 0 ? (
            avgSalaries.map((d, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{d.department}</td>
                <td className="border px-2 py-1">{d.avg_salary.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-2 py-1 text-center" colSpan={2}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
