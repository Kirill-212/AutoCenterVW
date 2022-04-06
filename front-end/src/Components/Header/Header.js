import React from "react";
import LogOut from "../Auth/LogOut";
function Header(props) {
  

  return (
    <div className=" d-flex justify-content-between bg-dark text-white ">
      <div className="col">{props.name}</div>
      <div className="col text-center">Auto Center VW</div>
      <div className="col text-right pt-2"><LogOut /></div>
    </div>
  );
}
export default Header;
