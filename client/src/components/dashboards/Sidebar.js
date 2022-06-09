import React from "react";
import "./Sidebar.css";
import {
  Timeline,
  ShowChart,
  MultilineChart,
  Person,
  Assignment,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h5> Dashboards </h5>
          <ul className="sidebarList">
            <Link to="/dashboards/unitanalytics">
              <li className="sidebarListItem">
                <ShowChart className="sidebarIcon" />
                Unit Analytics
              </li>
            </Link>

            <Link to="/dashboards/universityanalytics">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                University Analytics
              </li>
            </Link>

            <Link to="/dashboards/globalanalytics">
              <li className="sidebarListItem">
                <MultilineChart className="sidebarIcon" />
                Global Analytics
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h5> Personnal Information </h5>
          <ul className="sidebarList">
            <Link to="/updateprofile">
              <li className="sidebarListItem">
                <Person className="sidebarIcon" />
                My profile
              </li>
            </Link>

            <Link to="/manageunit">
              <li className="sidebarListItem">
                <Assignment className="sidebarIcon" />
                Manage My Units
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
