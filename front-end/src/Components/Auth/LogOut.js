import React from "react";

function LogOut() {
  function ClearStorage() {
    localStorage.clear();
  }

  return (
    <div>
      <a onClick={ClearStorage} className="text-reset" href="/login">
        <i className="fa fa-window-close" aria-hidden="true"></i>
      </a>
    </div>
  );
}
export default LogOut;
