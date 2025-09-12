import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios";

export default function EmployeeForm() {
  const { employee_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    department: "",
    salary: "",
    joining_date: "",
    skills: [],
  });

  useEffect(() => {
    if (employee_id) {
      api.get(employee_id).then((res) => setForm(res.data));
      console.log(employee_id); 
    }
  }, [employee_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") setForm({ ...form, skills: value.split(",") });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employee_id) {
      await api.put(`${employee_id}/update`, form);
    } else {
      await api.post("create", form);
    }
    console.log("navigating ......");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input
        name="employee_id"
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={handleChange}
        disabled={!!employee_id}
        className="border p-1"
      />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-1"/>
      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        className="border p-1"
      />
      <input
        name="salary"
        placeholder="Salary"
        type="number"
        value={form.salary}
        onChange={handleChange}
        className="border p-1"
      />
      <input
        name="joining_date"
        placeholder="YYYY-MM-DD"
        value={form.joining_date}
        onChange={handleChange}
        className="border p-1"
      />
      <input
        name="skills"
        placeholder="Skills (comma separated)"
        value={form.skills.join(",")}
        onChange={handleChange}
        className="border p-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 mt-2">
        {employee_id ? "Update" : "Add"} Employee
      </button>
    </form>
  );
}
