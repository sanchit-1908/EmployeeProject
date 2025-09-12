import { useEffect, useState } from "react";
import api from "../axios";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [skill, setSkill] = useState("");
  const [id, setId] = useState("");

  const fetchAll = async () => {
    const res = await api.get("");
    setEmployees(res.data);
    console.log(employees);
  };

  const fetchByDepartment = async () => {
    if (department) {
      const res = await api.get(`department/${department}`);
      setEmployees(res.data);
    } else fetchAll();
  };

  const fetchBySkill = async () => {
    if (skill) {
      const res = await api.get(`search/${skill}`);
      setEmployees(res.data);
    } else fetchAll();
  };

  const fetchById = async () => {
      if(id)
      {
        const res = await api.get(`${id}`);
        setEmployees([res.data]);
      }else fetchAll();

  };

  useEffect(() => {
    fetchAll();
  }, []);

  const deleteEmployee = async (id) => {
    await api.delete(`${id}/delete`);
    fetchAll();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <div className="mb-4 flex gap-2">

        <input
          className="border p-1"
          placeholder="Filter by department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-2" onClick={fetchByDepartment}>Filter</button>

        <input
          className="border p-1"
          placeholder="Search by skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button className="bg-green-500 text-white px-2" onClick={fetchBySkill}>Search</button>


        <input
          className="border p-1"
          placeholder="Search by ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="bg-yellow-500 text-white px-2" onClick={fetchById}>Search ID</button>


         <Link
            to="/avg-salary"
            className="bg-purple-600 text-white px-3 py-1 rounded"
          >
            Department Avg Salary
          </Link>


      </div>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Department</th>
            <th className="border px-2 py-1">Salary</th>
            <th className="border px-2 py-1">Joining Date</th>
            <th className="border px-2 py-1">Skills</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e._id}>
              <td className="border px-2 py-1">{e.employee_id}</td>
              <td className="border px-2 py-1">{e.name}</td>
              <td className="border px-2 py-1">{e.department}</td>
              <td className="border px-2 py-1">{e.salary}</td>
              <td className="border px-2 py-1">{e.joining_date}</td>
              <td className="border px-2 py-1">{e.skills.join(", ")}</td>
              <td className="border px-2 py-1">
                <Link className="text-blue-500 mr-2" to={`/edit/${e.employee_id}`}>Edit</Link>
                <button className="text-red-500" onClick={() => deleteEmployee(e.employee_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
