import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeaveBalanceService from "../../services/LeaveBalanceService";
import EmployeeService from "../../services/EmployeeService";
import LeaveTypeService from "../../services/LeaveTypeService";
import "../commonCss.css";

const LeaveBalanceList = () => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [employees, setEmployees] = useState({});
  const [leaveTypes, setLeaveTypes] = useState({});
  const [employeeNameFilter, setEmployeeNameFilter] = useState("");
  const [employeeIdFilter,setEmployeeIdFilter]=useState("");
  const [typeNameFilter, setTypeNameFilter] = useState("");

  useEffect(() => {
    fetchLeaveBalances();
    fetchEmployees();
    fetchLeaveTypes();
  }, []);

  const fetchLeaveBalances = () => {
    LeaveBalanceService.getAllLeaveBalances()
      .then((response) => {
        console.log(response.data);
        setLeaveBalances(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchEmployees = () => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        const employeeMap = {};
        response.data.forEach((employee) => {
          employeeMap[employee.employeeId] = employee.name;
        });
        setEmployees(employeeMap);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchLeaveTypes = () => {
    LeaveTypeService.getAllLeaveTypes()
      .then((response) => {
        const leaveTypeMap = {};
        response.data.forEach((leaveType) => {
          leaveTypeMap[leaveType.typeId] = leaveType.typeName;
        });
        setLeaveTypes(leaveTypeMap);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const applyFilters = () => {
    let filteredBalances = leaveBalances;
    if (employeeNameFilter) {
      filteredBalances = filteredBalances.filter(
        (balance) => balance.employee.name.toLowerCase().includes(employeeNameFilter.toLowerCase())
      );
    }
    if (typeNameFilter) {
      filteredBalances = filteredBalances.filter(
        (balance) => balance.leaveType.typeName.toLowerCase().includes(typeNameFilter.toLowerCase())
      );
    }
    return filteredBalances;
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Link to="/admin" className="btn text-white-50 bg-dark ms-1">
            Home
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
      <h1 className="mb-4">List of Employees' Leave Balances</h1>
      <hr></hr><br></br>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Balance ID</th>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
         {applyFilters().map((leaveBalance) => (
            <tr key={leaveBalance.balanceId}>
              <td>{leaveBalance.balanceId}</td>
              <td>{leaveBalance.employee.name}</td>
              <td>{leaveBalance.leaveType.typeName}</td>
              <td>{leaveBalance.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default LeaveBalanceList;
