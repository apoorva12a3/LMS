import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeaveTypeService from "../../services/LeaveTypeService";
import "../commonCss.css";

const LeaveTypeList = () => {
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

  const deleteLeaveType = (leaveTypeId) => {
    LeaveTypeService.deleteLeaveType(leaveTypeId)
      .then(() => {
        fetchLeaveTypes();
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
        &nbsp;&nbsp;
      <Link to="/admin/addLeaveType" className="btn text-white-50 bg-dark">
        Add New LeaveType
      </Link>
      </div>
      
      <h1 className="mb-4">Type Of  Leave</h1>
      <hr></hr><br></br>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type ID</th>
            <th>Type Name</th>
            <th>Count Allowed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveTypes.map((leaveType) => (
            <tr key={leaveType.typeId}>
              <td>{leaveType.typeId}</td>
              <td>{leaveType.typeName}</td>
              <td>{leaveType.countAllowed}</td>
              <td>
                <Link
                  to={`/admin/editLeaveType/${leaveType.typeId}`}
                  className="btn btn-primary mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteLeaveType(leaveType.typeId)}
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
  );
};

export default LeaveTypeList;
