import React from "react";
import Header from './Header'
import { Outlet } from "react-router-dom";
import LogOut from "../Auth/LogOut";
function UserHeader() {
  return (
    <div className="container-fluid">
      <Header name="User"/>
      <div className="row">
        <Outlet />
      </div>
    </div>
  );
}
export default UserHeader;
