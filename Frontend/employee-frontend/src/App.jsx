import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import AvgSalary from "./components/AvgSalary";
import "./main.css"  

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/edit/:employee_id" element={<EmployeeForm />} />
        <Route path="/avg-salary" element={<AvgSalary />} />
      </Routes>
    </Router>
  );
}

export default App;
