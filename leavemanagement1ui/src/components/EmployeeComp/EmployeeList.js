import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import "../commonCss.css";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeNameFilter, setEmployeeNameFilter] = useState("");
  const [employeeIdFilter, setEmployeeIdFilter] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEmployee = (employeeId) => {
    EmployeeService.deleteEmployee(employeeId)
      .then(() => {
        fetchEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const applyFilters = () => {
    let filteredEmployees = employees;
    if (employeeNameFilter) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.name.toLowerCase().includes(employeeNameFilter.toLowerCase())
      );
    }
    if (employeeIdFilter) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.employeeId.toString() === employeeIdFilter
      );
    }
    return filteredEmployees;
  };
  

  return (
    <>
  
    <br></br>
    <br></br>
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Link to="/admin" className="btn text-white-50 bg-dark ms-1">
            Home
          </Link>
          <Link to="/admin/addEmployee" className="btn text-white-50 bg-dark ms-3">
            Add Employee
          </Link>
        </div>
        <div className="dropdown">
          <a
            className="btn text-white-50 bg-dark dropdown-toggle ms-4"
            href="#"
            id="Dropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            FilterBy
          </a>
          <ul className="dropdown-menu">
            <li>
              <div className="form-group ms-25">
                <input
                  type="text"
                  value={employeeNameFilter}
                  onChange={(e) => setEmployeeNameFilter(e.target.value)}
                  className="form-control"
                  placeholder=" Name "
                />
              </div>
            </li>
            <li>
              <div className="form-group">
                <input
                  type="text"
                  value={employeeIdFilter}
                  onChange={(e) => setEmployeeIdFilter(e.target.value)}
                  className="form-control"
                  placeholder="ID "
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <h1 className="mb-3">List Of Employees</h1>
      <hr />
      <br />
      <table className="table table-striped mb-4">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applyFilters().map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.department}</td>
              <td>{employee.username}</td>
              <td>
                <Link
                  to={`/admin/editEmployee/${employee.employeeId}`}
                  className="btn btn-primary mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEmployee(employee.employeeId)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default EmployeeList;
