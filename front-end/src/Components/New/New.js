import React from "react";
import ListNews from "./ListNews";

const New = props => {
  return (
    <div className="container-md">
      <div className="row mt-5 pt-5 align-items-center">
        <ListNews
          setMessageError={props.setMessageError}
          handleToggle={props.handleToggle}
          handleClose={props.handleClose}
        />
      </div>
    </div>
  );
};

export default New;
