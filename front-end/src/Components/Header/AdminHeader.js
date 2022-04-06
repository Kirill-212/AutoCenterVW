import React from "react";
import Header from './Header'
import { Outlet  } from "react-router-dom";

function AdminHeader() {

  return (
    <div className="container-fluid">
    <Header name="Admin"/>
    <Outlet/>
    </div>
  );
}
export default AdminHeader;
