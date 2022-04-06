import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import LogOut from "../Auth/LogOut";
function UserHeader() {
  return (
    <div className="container-fluid">
      <Header name="User" />

      <Outlet />
    </div>
  );
}
export default UserHeader;
