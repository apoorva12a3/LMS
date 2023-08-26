import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeaveBalanceService from "../../services/LeaveBalanceService";
import LeaveTypeService from "../../services/LeaveTypeService";
import EmployeeService from "../../services/EmployeeService";
import "../commonCss.css";

const LeaveBalanceListUser = ({ employeeId }) => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState({});
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    fetchLeaveBalances();
    fetchLeaveTypes();
    fetchEmployee();
  }, [employeeId]);

  const fetchLeaveBalances = () => {
    LeaveBalanceService.getLeaveBalancesByEmployeeId(employeeId)
      .then((response) => {
        console.log(response.data);
        setLeaveBalances(response.data);
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

  const fetchEmployee = () => {
    EmployeeService.getEmployeeById(employeeId)
      .then((response) => {
        const employeeData = response.data;
        setEmployee(employeeData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
   
 
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center mt-0">
          <Link to="/admin" className="btn text-white-50 bg-dark ms-1">
            Home
          </Link>
          </div>
      </div>

         

      <h4 className="mb-4">Leave Balance List for Employee ID: {employeeId}</h4>
      <hr /> 
      <h4>Hello, {employee.name}. Check your leave balance.</h4>
      
    
    
         
      
    {/* <div className="container">
     
      <br />
      
      </div>
       */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Balance ID</th>
            <th>Leave Type</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {leaveBalances.map((leaveBalance) => (
            <tr key={leaveBalance.balanceId}>
              <td>{leaveBalance.balanceId}</td>
              <td>{leaveBalance.leaveType.typeName}</td>
              <td>{leaveBalance.balance}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
    </>
  );
};

export default LeaveBalanceListUser;
