import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeaveRequestService from "../../services/LeaveRequestService";
import LeaveRequestCalendar from "../LeaveRequestCalendar";
import "../commonCss.css";

const LeaveRequestList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employeeNameFilter, setEmployeeNameFilter] = useState("");
  const [typeNameFilter, setTypeNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isCalendarView, setIsCalendarView] = useState(false); // Toggle state

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await LeaveRequestService.getAllLeaveRequests();
      const leaveRequestsData = response.data;
      setLeaveRequests(leaveRequestsData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLeaveRequest = async (leaveRequestId) => {
    try {
      await LeaveRequestService.deleteLeaveRequest(leaveRequestId);
      fetchLeaveRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (leaveRequestId, status) => {
    const confirmed = window.confirm("Are you sure you want to update the status?");
    if (confirmed) {
      try {
        await LeaveRequestService.updateLeaveRequestStatus(leaveRequestId, { status });
        fetchLeaveRequests();
        alert("Leave request status updated successfully.");
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          alert(`Error: ${errorMessage}`);
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    } else {
      alert("Status update canceled."); // Display cancel message
    }
  };
  
  

  const applyFilters = () => {
    let filteredRequests = leaveRequests;
    if (employeeNameFilter) {
      filteredRequests = filteredRequests.filter(
        (request) => request.employeeId.name.toLowerCase().includes(employeeNameFilter.toLowerCase())
      );
    }
    if (typeNameFilter) {
      filteredRequests = filteredRequests.filter(
        (request) => request.leaveTypeName.typeName.toLowerCase().includes(typeNameFilter.toLowerCase())
      );
    }
    if (statusFilter) {
      filteredRequests = filteredRequests.filter(
        (request) => request.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    return filteredRequests;
  };

  const handleToggleView = () => {
    setIsCalendarView(!isCalendarView);
  };

  return (
    <>
<div className="container">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <div className="d-flex align-items-center">
      <Link to="/admin" className="btn text-white-50 bg-dark ms-1">
        Home
      </Link>
      <div className="dropdown ms-3">
        <a
          className="dropdown-toggle btn text-white-50 bg-dark"
          href="#"
          id="Dropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            backgroundImage: "none"
          }}
        >
          FilterBy
        </a>
        <ul className="dropdown-menu">
          <li>
            <div className="form-group ms-3">
              <input
                type="text"
                value={employeeNameFilter}
                onChange={(e) => setEmployeeNameFilter(e.target.value)}
                className="form-control"
                placeholder=" Name"
              />
            </div>
          </li>
          <li>
            <div className="form-group ms-3">
              <input
                type="text"
                value={typeNameFilter}
                onChange={(e) => setTypeNameFilter(e.target.value)}
                className="form-control"
                placeholder="Leave Type"
              />
            </div>
          </li>
          <li>
            <div className="form-group ms-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-control"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className="form-check form-switch ms-4">
      <input
        className="form-check-input"
        type="checkbox"
        id="calendarViewToggle2"
        checked={isCalendarView}
        onChange={handleToggleView}
      />
      <label className="form-check-label " htmlFor="calendarViewToggle2">
        Calendar View
      </label>
    </div>
  </div>
 

  <h1 className="ms-10 text-center">List Of Employees Leave Request</h1>
  <hr />
  <br />
  
  



      <br></br>
      {!isCalendarView ? ( // Render list view
        <div>
          
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Employee ID</th>
                <th>Leave Type</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Accept/Reject</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applyFilters().map((leaveRequest) => (
                <tr key={leaveRequest.requestId}>
                  <td>{leaveRequest.requestId}</td>
                  <td>{leaveRequest.employeeId.name}</td>
                  <td>{leaveRequest.leaveTypeName.typeName}</td>
                  <td>{leaveRequest.status}</td>
                  <td>{leaveRequest.startDate}</td>
                  <td>{leaveRequest.endDate}</td>
                  <td>{leaveRequest.reason}</td>
                  <td>
                    {leaveRequest.status !== "Accepted" && leaveRequest.status !== "Rejected" ? (
                      <>
                        <button
                          onClick={() => handleStatusChange(leaveRequest.requestId, "Accepted")}
                          className="btn btn-success mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(leaveRequest.requestId, "Rejected")}
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td>
                    {/* {leaveRequest.status !== "Accepted" && leaveRequest.status !== "Rejected" ? (
                      <Link
                        to={`/admin/editLeaveRequest/${leaveRequest.requestId}`}
                        className="btn btn-primary mr-2"
                      >
                        Edit
                      </Link>
                    ) : (
                      <button className="btn btn-primary mr-2" disabled>
                        Edit
                      </button>
                    )} */}
                    <button
                      onClick={() => deleteLeaveRequest(leaveRequest.requestId)}
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
      ) : ( // Render calendar view
        <LeaveRequestCalendar leaveRequests={leaveRequests} />
      )}
      <br></br>
      <br></br>
    </div>

</>
  );
};

export default LeaveRequestList;
