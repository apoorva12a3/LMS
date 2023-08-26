import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import LeaveRequestListUser from "./LeaveRequestCompUser/LeaveRequestListUser";
import LeaveBalanceListUser from "./LeaveBalanceComp/LeaveBalanceListUser";
import LeaveTypeListUsers from "./TypeComp/LeaveTypeListUsers";
import AddLeaveRequestUser from "./LeaveRequestCompUser/AddLeaveRequestUser";
import UpdateLeaveRequestUser from './LeaveRequestCompUser/UpdateLeaveRequestUser';
// import "./commonCss.css";
import 'animate.css';

const UserHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('employeeId');
    navigate('/');
  };

  const logoStyle = {
    marginLeft: "20px",
    width: "40px",
  };

  return (
    <div className="shad" style={{  backgroundSize: "cover", minHeight: "96vh" }}>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}>
        <Link className="navbar-brand" to="/">
          <img src={require("./user.png")} alt="logo" style={logoStyle} />
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/user/leaverequestlistuser">
              Leave Request
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/leavebalancelistuser">
              Leave Balances
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/leavetypelistusers">
              Allowed Leave Counts
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<div className="container">
      <div className="avatar">
        
        <a href="https://codepen.io/MarioDesigns/">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/751678/skytsunami.png" alt="Skytsunami" />
        </a>
      </div>
      <br>
      </br>
      <br></br>
      
      <h3 className="text-shad">Welcome to Your Dashboard</h3>
    </div>
  } />
          <Route path="/leaverequestlistuser" element={<LeaveRequestListUser employeeId={localStorage.getItem('employeeId')} />} />
          <Route path="/leavebalancelistuser" element={<LeaveBalanceListUser employeeId={localStorage.getItem('employeeId')} />} />
          <Route path="/leavetypelistusers" element={<LeaveTypeListUsers />} />
          <Route path="/applyleave" element={<AddLeaveRequestUser employeeId={localStorage.getItem('employeeId')} />} />
          <Route path="editLeaveRequestUser/:requestId" element={<UpdateLeaveRequestUser employeeId={localStorage.getItem('employeeId')} />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserHome;
