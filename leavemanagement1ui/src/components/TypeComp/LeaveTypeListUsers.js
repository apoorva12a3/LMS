import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeaveTypeService from "../../services/LeaveTypeService";
import "../commonCss.css";

const LeaveTypeListUsers = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = () => {
    LeaveTypeService.getAllLeaveTypes()
      .then((response) => {
        console.log(response.data);
        setLeaveTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
    <div className="d-flex justify-content-end  mt-2">
    <Link to="/admin" className="btn text-white-50 bg-dark">
        Home
      </Link>
      
    </div>
    
    <h1 className="mb-4">Type Of  Leave</h1>
    <hr></hr>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type ID</th>
            <th>Type Name</th>
            <th>Count Allowed</th>
          </tr>
        </thead>
        <tbody>
          {leaveTypes.map((leaveType) => (
            <tr key={leaveType.typeId}>
              <td>{leaveType.typeId}</td>
              <td>{leaveType.typeName}</td>
              <td>{leaveType.countAllowed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
};

export default LeaveTypeListUsers;
