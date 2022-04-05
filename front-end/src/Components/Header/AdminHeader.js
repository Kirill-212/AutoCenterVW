import React from "react";
import Header from './Header'
import { Outlet  } from "react-router-dom";

function AdminHeader() {

  return (
    <>
    <Header name="Admin"/>
    <Outlet/>
    </>
  );
}
export default AdminHeader;
