import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavBar.css'; // Ensure you have this CSS file

const SideNavBar = () => {
  return (
    <div className="top-nav-bar">
      <div className="nav-content">
        <NavLink to="/addcourse" className="nav-link">
          Add Course
        </NavLink>
        <NavLink to="/course" className="nav-link">
          Courses
        </NavLink>
        <NavLink to="/addinstance" className="nav-link">
          Add Instance
        </NavLink>
        <NavLink to="/instance" className="nav-link">
          Instances
        </NavLink>
      </div>
    </div>
  );
};

export default SideNavBar;
