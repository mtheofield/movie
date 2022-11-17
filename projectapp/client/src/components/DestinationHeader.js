import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';

function DestinationHeader() {

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  console.log("---> splitLocation :" + (splitLocation[1]));


  return (
    <>
      <header className="header-blue">
        <nav className="nav-container-top">
          <table className="nav-table ">
            <tr className="menu-row">
              <td>
                <NavLink activeClassName="nav-table-cell-active" className="nav-table-cell" to="/logout">
                  Logout
                </NavLink>
              </td>
              <td>&nbsp;</td>
              <td>
                <NavLink activeClassName="nav-table-cell-active" className="nav-table-cell" to="/createReview">
                  Create Review
                </NavLink>
              </td>
              <td>&nbsp;</td>
              <td>
                <NavLink activeClassName="nav-table-cell-active" className={splitLocation[1] === "" ? "nav-table-cell-active" : "nav-table-cell"} to="/dashboard">
                  Dashboard
                </NavLink>
              </td>
              <td>
                <NavLink activeClassName="nav-table-cell-active" className="nav-table-cell" to="/about">
                  About
                </NavLink>
              </td>
            </tr>
          </table>
        </nav>
      </header>
    </>
  );
}
export default DestinationHeader;
