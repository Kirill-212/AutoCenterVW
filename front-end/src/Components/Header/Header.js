import React from "react";
import LogOut from "../Auth/LogOut";
function Header(props) {
  

  return (
    <div className="row d-flex justify-content-between flex-row bg-dark text-white align-items-start">
      <div className="col-4">{props.name}</div>
      <div className="col-4 text-center">Auto Center VW</div>
      <div className="col-4 text-right pt-2"><LogOut /></div>
    </div>
  );
}
export default Header;
