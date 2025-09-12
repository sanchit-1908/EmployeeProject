import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <Link className="mr-4" to="/">Employees</Link>
      <Link to="/add">Add Employee</Link>
    </nav>
  );
}
