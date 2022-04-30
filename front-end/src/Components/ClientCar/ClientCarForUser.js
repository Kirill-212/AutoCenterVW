import React from "react";
import ListClientCar from "./ClientCarListForUser";

const ClietnCarForUser = (props) => {
  return (
    <div className="container-md">
      <div className="row mt-5 pt-5 align-items-center">
        <ListClientCar  setMessageError={props.setMessageError} />
      </div>
    </div>
  );
};

export default ClietnCarForUser;
